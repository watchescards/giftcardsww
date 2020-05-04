const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    password: String,
    username:{type:String,unique:true},
    address:String,
    email:String,
    contact:String,
    country:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);




