const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = new mongoose.Schema({
    password: String,
    username:{type:String,unique:true},
    email:{type:String,unique:true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});


AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin", AdminSchema);




