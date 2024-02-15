const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
})


async function sendVerificationMail(email, otp){
    try{
        const mail = await mailSender(email, "Verfication Mail", otp);
        console.log("Mail sent successfully");

    }catch(err){
        console.log("Error occured while sending mail", err);
        
    }

}

OTPSchema.pre("save", async function(next){
    console.log(this.email);
    console.log(this.otp);
    await sendVerificationMail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("OTP", OTPSchema);