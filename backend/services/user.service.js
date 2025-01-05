const userModel = require('../models/user.model');

//creating a user model where the function accepts paraemters as object
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    //throws an error if the fields are empty
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    //creates a user with the fields and returns the user
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}