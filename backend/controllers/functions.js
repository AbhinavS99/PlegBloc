require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// To show an error message on the UI.
function sendErrorMessage(res, statusCode, message) {
    console.log("Error Message = ", message);
    return res.status(statusCode).send({
        'isError': true,
        'message': message
    });
};


// To check if user is logged in or not.
function isLoggedIn(req) {
    if (typeof req.cookies.token == "undefined") {
        console.log("Token is not present in the cookies.");
        return false;
    } else {
        try {
            const payload = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET);
            return true;
        } catch (err) {
            console.log(err);
            console.log("Token is present in the cookies but not verifying correctly.");
            return false;
        }
    }
}


async function hash(password) {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}


async function comparePassword(password, hash) {
    try {
        let ans = await bcrypt.compare(password, hash);
        if (ans) {
            console.log("password correct");
            return true;
        }
        console.log("password incorrect");
        return false;
    } catch (e) {
        return false;
    }
}


module.exports = {
    sendErrorMessage,
    isLoggedIn,
    hash,
    comparePassword
}