const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

//register user
module.exports.registerUser = async (req, res, next) => {

    //validating the request body
    const errors = validationResult(req);

    //if the request body is not valid then send an error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //extracting the fields from the request body
    const { fullname, email, password } = req.body;

    //checking wether the user already exists with same email id
    const isUseralreadyexists = await userModel.findOne({ email });

    //if exists then throws a response that user already exits
    if (!isUseralreadyexists) {
        return res.status(400).json({ message: 'user already exists with the email id' });
    }

    //hasing the password
    const hashedPassword = await userModel.hashPassword(password);

    //calling the user service to create a user
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    //generating auth token for the user
    const token = user.generateAuthToken();
    //sending the user and the token as response
    res.status(201).json({ user, token });
}
//login user
module.exports.loginUser = async (req, res, next) => {
    //validating the request body
    const errors = validationResult(req);

    //if the request body is not valid then send an error message
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //extracting the fields from the request body
    const { email, password } = req.body;

    //checking if the user exists with the email if the user exists then select the password field
    const user = await userModel.findOne({ email }).select('+password');

    //if the user does not exist then send an error message
    if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    //checking if the user exists and the password is correct
    const isMatch = await user.comparePasswords(password);

    //if the password is incorrect then send an error message
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    //sending the user and the token as response
    const token = user.generateAuthToken();

    //cookie
    res.cookie('token', token);//sends the token as a cookie

    //prodcution method
    // res.cookie('token', token, { 
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',//if we are in production then we set the secure to true
    //     maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    // });

    //sending the user the token as response
    res.status(200).json({ user, token });
};
//user profile
module.exports.userProfile = async (req, res, next) => {
    //getting the user id from the request
    return res.status(200).json({ user: req.user });
}

//logout user
module.exports.logoutUser = async (req, res, next) => {
    //clearing the cookie
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    
    return res.status(200).json({ message: 'logout successful' });
}