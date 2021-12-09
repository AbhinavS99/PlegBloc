require("dotenv").config();
const {sendErrorMessage, isLoggedIn, hash, comparePassword, genOtp, verifyOtp, sendEmail} = require('./functions');
const {generateToken} = require('../config/jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Campaign = require('../models/campaign');


module.exports.home = (req, res) => {
    return sendErrorMessage(res, 404, "Home Page!");
};


module.exports.signup = async (req, res) => {
    console.log("Request aayi mere paas!!");

    const _name = req.body.name;
    const _username = req.body.username;
    const _email = req.body.email;
    const _password = req.body.password;
    const _phone = req.body.phone;
    const _walletID = req.body.wallet_id;

    User.findOne({email:_email}, async (err, user) => {
        if (err) return sendErrorMessage(res, 403, "Error in finding the user in DB");

        if (!user) {
            const hashPassword = await hash(_password);
            let userObject = {
                'name': _name,
                'username': _username,
                'email': _email,
                'password': hashPassword,
                'phone': _phone,
                'walletID': _walletID
            };
            User.create(userObject, (err, user) => {
                if (err) return sendErrorMessage(res, 200, "Unable to create a user while signUp!");
                return res.status(200).send({
                    'isError': false,
                    'user': user
                });
            });
        } else {
            return sendErrorMessage(res, 200, "This email ID is already exist!");
        }
    });
}


module.exports.signin = async (req, res) => {
    // const data = JSON.parse(Object.keys(req.body)[0]);
    const _email = req.body.email;
    const _password = req.body.password;
    console.log('=>', req.body);
    
    User.findOne({email: _email}, async (err, user) => {
        if (err) return sendErrorMessage(res, 200, "Error in finding this user from DB");
        console.log('=>', user);
        if (user) {
            const isSame = await comparePassword(_password, user.password);
            if (isSame == false) {
                return sendErrorMessage(res, 200, "User has entered a wrong password.");
            }
    
            // check if the user is verfied or not?
            if (user.isVerified == false) {
                // generate otp and sent this OTP on user's email address.
                const actualOtp = await genOtp(user.email);
                await sendEmail(user.username, user.email, actualOtp).catch(console.error);
                return res.status(200).send({
                    'isError': false,
                    'isVerified': false,
                    'email': user.email
                });
            }
            
            const accessToken = generateToken(_email);
            res.cookie("token", accessToken, {
                    httpOnly: true,
            });
            return res.status(200).json({
                'isError': false,
                'isVerified': true,
                // 'token': accessToken,
                'user': user
            });
        } else {
            return sendErrorMessage(res, 200, "This user do not exist!");
        }
    })
}


module.exports.verifyOtp = async (req, res) => {
    const _email = req.body.email;
    const _userOtp = req.body.userOtp;

    let isOtpCorrect = await verifyOtp(_userOtp, _email);
    if (!isOtpCorrect) {
        return sendErrorMessage(res, 404, `User has enetered a wrong Otp. Please repeat this process!`);
    }

    // set token in the cookies.
    const accessToken = generateToken(_email);
    res.cookie("token", accessToken, {
        httpOnly: true,
    });
    User.findOne({email: _email}, async (err, user) => {
        if (err) return sendErrorMessage(res, 404, `User with ${_email} do not exist!`);
        user.isVerified = true;
        await user.save();
        return res.status(200).send({
            'isError': false,
            'user': user
        }); 
    });
};


module.exports.createCampaign = async (req, res) => {
    if (isLoggedIn(req) == false) return sendErrorMessage(res, 404, "You need to sign in first.");

    const _campaignName = req.body.name;
    const _campaignDesc = req.body.description;
    const _campaignMinAmount = req.body.minAmount;
    const _campaignTargetAmount = req.body.targetAmount;

    Campaign.findOne({name: _campaignName}, async (err, campaign) => {
        if (err) return sendErrorMessage(res, 401, "Error while finding this camapign from DB");

        if (!campaign) {
            const username = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET).username;
            let campaignObject = {
                'manager': username,
                'name': _campaignName,
                'description': _campaignDesc,
                'minAmount': _campaignMinAmount,
                'targetAmount': _campaignTargetAmount
            };
            Campaign.create(campaignObject, async (err, campaign) => {
                if (err) return sendErrorMessage(res, 400, "Error while creating a campaign.");
                // find the user from the DB and put this campaign into this user campaign list too.
                User.findOne({username: username}, async (err, user) => {
                    if (err) return sendErrorMessage(res, 400, "Error in finding the user from the DB.");

                    await user.myCreatedCampaigns.push(campaign);
                    await user.save();

                    return res.status(200).send({
                        'isError': false,
                        'user': user
                    });
                });
            });
        } else {
            return sendErrorMessage(res, 400, "This campaign already exist!");
        }
    });
}