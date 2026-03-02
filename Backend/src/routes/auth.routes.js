const {Router} = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { registerUserController, loginUserController, logoutUserController, getMeController } = require('../controllers/auth.controller');
const authUser = require('../middlewares/auth.middleware');
const authRouter = Router();


/* 
* @route POST /api/auth/register
* @description Register a new user
* @access Public
*/

authRouter.post('/register', registerUserController);



/* 
* @route POST /api/auth/login
* @description Login a user with email and password
* @access Public 
*/
authRouter.post('/login', loginUserController);


/*
* @route GET /api/auth/logout
* @description clear the token from user cookie and add the token in blacklist.
* @access Public
*/

authRouter.get('/logout', logoutUserController)



/*
* @route GET /api/auth/get-me
* @description Get the current logged in user details
* @access Private
*/
authRouter.get('/get-me', authUser, getMeController )

module.exports = authRouter;



