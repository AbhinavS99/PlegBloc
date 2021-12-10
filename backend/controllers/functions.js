require('dotenv').config();
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const initVector = Buffer.from(process.env.initVector, "hex");
const Securitykey = Buffer.from(process.env.security_key, "hex");
const timeWindow = 60000 + 60000; // 1+1 minute


// To show an error message on the UI.
function sendErrorMessage(res, statusCode, message) {
    console.log("Error Message = ", message);
    return res.status(statusCode).send({
        'isError': true,
        'message': message
    });
};


// Send the OTP on user's email ID.
async function sendEmail(username, email, otp) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "noreply.somag@gmail.com",
            pass: "FCSsomag@101",
        },
    });
    var mailOptions = {
        from: "noreply.somag@gmail.com",
        to: email,
        subject: "Verify your Email address with PlegBloc",
        html: `<p>Hi ${username}!<br><br>Thank you for choosing PlegBloc. Use the following OTP to verify yourself. OTP is valid for next 2 minutes only.<br><br>${otp}<br><br>Regards!<br>PlegBloc</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}


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


// Hash the password.
async function hash(password) {
    const saltRounds = 10;
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}


// Verify the hashed password.
async function comparePassword(password, hash) {
    try {
        let ans = await bcrypt.compare(password, hash);
        if (ans) {
            console.log("Password is Correct.");
            return true;
        }
        console.log("Password is Incorrect.");
        return false;
    } catch (e) {
        return false;
    }
}


// Generate an OTP with user's email.
const genOtp = async (email) => {
    const userObj = {
        name: email,
        time: Date.now(),
    };

    let encoded = await encrypt(JSON.stringify(userObj));
    return encoded.content;
};


// Verify the OTP.
const verifyOtp = async (otp, email) => {
    try {
        const decipher = crypto.createDecipheriv(
            algorithm,
            Securitykey,
            initVector
        );
        let decrypted = decipher.update(
            Buffer.from(otp, "hex"),
            "hex",
            "utf-8"
        );
        decrypted += decipher.final("utf-8");
        decrypted = JSON.parse(decrypted.toString());
        if (
            decrypted.name == email &&
            Date.now() - decrypted.time <= timeWindow
        )
            return true;
        return false;
    } catch (e) {
        return false;
    }
};


// Encrypt a message with 'aes-256-cbc' algorithm.
const encrypt = async (message) => {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encrypted = cipher.update(message, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return {
        iv: initVector.toString("hex"),
        content: encrypted.toString("hex"),
    };
};


// Decrypt the encoded message using 'aes-256-cbc' algorithm.
const decrypt = async (encoded) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Securitykey,
        initVector
    );
    let decrypted = decipher.update(
        Buffer.from(encoded.content, "hex"),
        "hex",
        "utf-8"
    );
    decrypted += decipher.final("utf-8");
    return decrypted.toString();
};


module.exports = {
    sendErrorMessage,
    isLoggedIn,
    hash,
    comparePassword,
    genOtp,
    verifyOtp,
    sendEmail
}