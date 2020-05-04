const mongoose = require("mongoose");


const CardsSchema = new mongoose.Schema({
   
    card_name:String,
    card_image:String,
    card_description:String,
    hq:String,
    customer_care:String,
    max_pin:{type:Number},
    policy:{type:String},
    max_card:{type:Number},
    terms:{type:String},
    startwith:{type:Number},
    instructions:{type:String},
    createdAt:{type:Date,default:Date.now()}
});


module.exports = mongoose.model("Cards", CardsSchema);




