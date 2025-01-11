const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel=require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


//creating a middleware to authenticate the user
module.exports.authUser = async (req, res, next) => {

    //extracting the token from the request header or the cookie
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    //if the token does not exist then send an error message
    if (!token) {
        return res.status(401).json({ messsage: 'authorization denied' });
    }
    //checking if the token is blacklisted or not
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });

    //if the token is blacklisted then send an error message
    if (isBlacklisted) {
        return res.status(401).json({ message: 'authorization denied' });
    }

    //if we get theh toke then we decode it using the jwt secret key and verify the token
    try {
        //decoding the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //verifying the token
        //if the token is verified then we find the user by the id
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    } catch (err) {
        //if the token is not verified then send an error message
        return res.status(401).json({ msg: 'authorization denied' });
    }

}

//creating a middleware to authenticate the captaion

module.exports.authCaptain=async (req,res, next) => {
     //extracting the token from the request header or the cookie
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

     //if the token does not exist then send an error message
     if (!token) {
         return res.status(401).json({ messsage: 'authorization denied' });
     }
     //checking if the token is blacklisted or not
     const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
 
     //if the token is blacklisted then send an error message
     if (isBlacklisted) {
         return res.status(401).json({ message: 'authorization denied' });
     }
 
     //if we get theh toke then we decode it using the jwt secret key and verify the token
     try {
         //decoding the token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
         //verifying the token
         //if the token is verified then we find the user by the id
         const captain = await captainModel.findById(decoded._id);
 
         req.captain = captain;
 
         return next();
 
     } catch (err) {
         //if the token is not verified then send an error message
         return res.status(401).json({ msg: 'authorization denied' });
     }
 
}