const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

const MessageSchema = new mongoose.Schema({
    uid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
    },
    message:String,
    subject:String,
    createdAt:{type:Date,default:Date.now()}
});

MessageSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Message", MessageSchema);




