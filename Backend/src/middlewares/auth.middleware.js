const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");


/** * @name authUser
 * @description Middleware to authenticate a user by verifying the JWT token from cookies and checking against the blacklist.
 * If the token is valid and not blacklisted, the decoded user information is attached to the request object.
 * @access Private
 */
async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const isTokenBlacklisted = await blacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token is invalid" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authUser;