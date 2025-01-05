const express = require('express');
//calling the router function from express
const router = express.Router();
// express validator is used to validate the input fields
const { body } = require('express-validator');
//calling the user controller
const userController = require('../controllers/user.controller');

//creating a post router
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').isLength({ min: 3 }).withMessage('First Name must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
],
    userController.registerUser//controller to register the user
);

module.exports = router;