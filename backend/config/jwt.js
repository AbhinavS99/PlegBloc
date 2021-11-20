require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.generateToken = (_username) => {
    // payload.
    const user = {
        username: _username
    };
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWTtokenExpiryTime,
    });
};