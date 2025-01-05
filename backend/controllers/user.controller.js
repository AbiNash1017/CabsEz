const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //extracting the fields from the request body
    const { fullname, email, password } = req.body;

    //hasing the password
    const hashedPassword = await userModel.hashPassword(password);

    //calling the user service to create a user
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedPassword
    });

    //generating auth token for the user
    const token=user.generateAuthToken();
    //sending the user and the token as response
    res.status(201).json({ user, token });
}