const express=require('express');
//calling the router function from express
const router =express.Router();
// express validator is used to validate the input fields
const {body}=require('express-validator');

//creating a post router
router.post('/register',[
    body('email').isEmail().writeMessage('Invalid Email'),
    body('fullname').isLength({min:3}).writeMessage('First Name must be atleast 3 characters long'),
    
])

module.exports=router;