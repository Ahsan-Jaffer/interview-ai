const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description Register a new user, expects username, email, and password in the request body.
 * @access Public
 */
async function registerUserController(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email, and password",
      });
    }

    // Check if the user already exists
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res
        .status(400)
        .json({ message: "Email or username already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    //token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({ message: "User registered successfully", 
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        },
        
     });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


/** * @name loginUserController
 * @description Login a user, expects email and password in the request body.
 * @access Public
 */

async function loginUserController(req, res) {

    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Please provide email and password"})
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const token = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
         );

        res.cookie("token", token);

        res.status(200).json({ message: "Login successful", 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            
         });

    }catch(error){
        res.status(500).json({ message: "Server error" });
    }

}


/** * @name logoutUserController
 * @description Logout a user by clearing the token cookie and adding the token to the blacklist.
 * @access Public
 */
async function logoutUserController(req, res) {
    try{
        const token = req.cookies.token;

        if(token){
            await blacklistModel.create({ token });
        }
        res.clearCookie("token");
        res.status(200).json({message:"User logged out successfully"});

    }catch(error){
        res.status(500).json({ message: "Server error" });
    }
}


/** * @name getMeController
 * @description Get the current logged in user details.
 * @access Private
 */
async function getMeController(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ 
            message: "User details retrieved successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
         });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
  registerUserController,
    loginUserController,
    logoutUserController,
    getMeControllers
};
