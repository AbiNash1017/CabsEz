const mongoose=require('mongoose');

//creating a blacklist token schema to store the blacklisted tokens and the time they were blacklisted
//note once a token is blacklisted it cannot be used again
const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:43200//the token will be blacklisted or expired after 12 hours
    }
});

module.exports=mongoose.model('blacklistToken',blacklistTokenSchema);
