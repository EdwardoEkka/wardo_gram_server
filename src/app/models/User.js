const mongoose = require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePicture:{type:String},
    bio:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
});

const User=mongoose.model('User',userSchema);

module.exports = User;