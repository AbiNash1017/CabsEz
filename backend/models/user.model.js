const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//creating a user schema for the user and the fields that the user will have
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: [3, 'First Name must be atleast 3 characters long'],
    },
    lastname: {
        type: String,
        minlength: [3, 'Last Name must be atleast 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be atleast 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    }
})
//generates the jwt token for the user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

//compare the password with the hashed password
userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
}

//hash the password before saving it to the database
userSchema.methods.hashpPassword = async function (password) {
    return await bcrypt.hash(password, 10);//the length of hased password will be 10
}

//creating a user model
const userModel = mongoose.model('user', userSchema);


module.exports = userModel;