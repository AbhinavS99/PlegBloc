require("dotenv").config();
const {sendErrorMessage, isLoggedIn, hash, comparePassword} = require('./functions');
const {generateToken} = require('../config/jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Campaign = require('../models/campaign');


module.exports.home = (req, res) => {
    return sendErrorMessage(res, 404, "Home Page!");
};


module.exports.signup = async (req, res) => {
    const _name = req.body.name;
    const _username = req.body.username;
    const _email = req.body.email;
    const _password = req.body.password;
    const _confirmPassword = req.body.confirm_password;
    const _phone = req.body.phone;

    if (_password != _confirmPassword) {
        return sendErrorMessage(res, 400, "password and confirm password must be same!");
    }

    User.findOne({username:_username}, async (err, user) => {
        if (err) return sendErrorMessage(res, 403, "Error in finding the user in DB");

        if (!user) {
            const hashPassword = await hash(_password);
            let userObject = {
                'name': _name,
                'username': _username,
                'email': _email,
                'password': hashPassword,
                'phone': _phone
            };
            User.create(userObject, (err, user) => {
                if (err) return sendErrorMessage(res, 403, "Unable to create a user while signUp!");
                return res.status(200).send({
                    'isError': false,
                    'user': user
                });
            })
        } else {
            return sendErrorMessage(res, 400, "This user is already exist!");
        }
    });
}


module.exports.signin = async (req, res) => {
    const _username = req.body.username;
    const _password = req.body.password;

    User.findOne({username: _username}, async (err, user) => {
        if (err) return sendErrorMessage(res, 404, "Error in finding this user from DB");
        
        if (user) {
            const isSame = await comparePassword(_password, user.password);
            if (isSame == false) {
                return sendErrorMessage(res, 404, "User has entered a wrong password.");
            }

            // check if the user is verfied or not?
            // if (user.isVerified == false) {
            //     // generate otp and sent this OTP on user's email address.
            // }

            const accessToken = generateToken(_username);
            res.cookie("token", accessToken, {
                    httpOnly: true,
            });
            return res.status(200).send({
                'isError': false,
                'isVerified': true,
                'token': accessToken,
                'user': user
            });
        } else {
            return sendErrorMessage(res, 404, "This user do not exist!");
        }
    })
}


module.exports.createCampaign = async (req, res) => {
    console.log("token", req.cookies);
    if (isLoggedIn(req) == false) return sendErrorMessage(res, 404, "You need to sign in first.");

    const _campaignName = req.body.name;
    const _campaignDesc = req.body.description;
    const _campaignMinAmount = req.body.minAmount;
    const _campaignTargetAmount = req.body.targetAmount;

    Campaign.findOne({name: _campaignName}, async (err, campaign) => {
        if (err) return sendErrorMessage(res, 401, "Error while finding this camapign from DB");

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
            User.findOne({username:username}, async (err, user) => {
                if (err) return sendErrorMessage(res, 400, "Error in finding the user from the DB.");

                await user.myCreatedCampaigns.push(campaign);
                await user.save();

                return res.status(400).send({
                    'isError': false,
                    'user': user
                });
            });
        });
    })
}