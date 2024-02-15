const User = require('../models/User');
const OTP = require('../models/OTP');
const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const {mailSender }= require('../utils/mailSender');
require('dotenv').config();


// creating an otp sending controller 
exports.sendOTP = async(req, res, next) => {
    try{
        // fetching email from requests body
        const {email} = req.body;

        // checking if email already exist
        const checkUserExist = await User.findOne({email});
        // if user already exist then return repsonse 
        if(checkUserExist){
            return res.status(500).json({
                success:false,
                message:"Email already exist"
            })
        }

        //send OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        const isOtpExist = await OTP.findOne({otp:otp});

        while(isOtpExist){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })

            isOtpExist = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email, otp};
        // create an entry for OTP

        const otpBody = await OTP.create({email, otp});
        console.log(otpBody);

        return res.status(200).json({
            success:true,
            message:"OTP sent successfully"
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while sending otp"
        })

    }
}

// signup Controller

exports.signup = async(req, res, next) => {
    try{

        //fetching data from requests body

        const {
            firstName,
            lastName,
            password,
            email,
            confirmPassword,
            accountType,
            otp,
            contactNumber
        } = req.body;

        // validationg data
        if(!firstName || !lastName || !password || !confirmPassword || !email || !otp){
            return res.status(403).json({
                success:false,
                message:"All the fields are required"
            })
        } 
        
        //validating password
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password doesn't match"
            })
        }

        // checking if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }

        // finding the recent otp from DB
        const user = await OTP.findOne({email}).sort({creatAt:-1}).limit(1);
        console.log(user);
        const recentOtp = user.otp;
        console.log("Recent otp", recentOtp);
        console.log("ENtered otp", otp);
        
        if(recentOtp.length == 0){
            // otp not found
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            }) 
        }else if(otp !== recentOtp){


            // otp doesn't matched
            return res.status(400).json({
                success:false,
                message:"OTP doesn't matched"
            })
        }

        // hashing password
        const hashedPass = await bcrypt.hash(password, 10);

        
        //
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            contactNumber:null,
            about:null
        })

        //creating entry in DB
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPass,
            accountType,
            additionalDetails:profileDetails,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User registered successfully"
        })


    }catch(err){

        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User can't created. Please try again"
        })

    }
}


exports.login = async(req, res, next) => {
    try{

        //fetching data from requests body
        const {email, password} = req.body;

        // validationg data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // checking for existing user
        const user = await User.findOne({email});

        // if user found return response
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist"
            })
        }

        // generating JWT after matching password 
        if(await bcrypt.compare(password, user.password)){

            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.acoountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            })

            user.token = token;
            user.password = undefined;

            //creating cookie and sending response 
            const options = {
                expires: new Date(Date.now() + 3 * 24 *3600 *1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In successfully",
            })

        }else{
            // password doesn't match so return response
            return res.status(401).json({
                success:false,
                message:"Password doesn't match"
            })
        }

        

    }catch(err){
        
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in login"
        })


    }
}

exports.changePassword = async(req, res, next) => {
    try{

        // fetching email from request body
        const {email, newPassword, confirmNewPassword, oldPassword} = req.body;

        // validating data

        if(!email){
            return res.status(400).json({
                success:false,
                message:"please fill the email"
            })
        }

        // validating if the user exist or not

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        // checking if the user entered the correct password or not 
        if(bcrypt.compare(oldPassword, existingUser.password)){
         // checking if the password matches or not 

            if(newPassword === confirmNewPassword){
                //hashing the new password
                const hashPass = await bcrypt.hash(newPassword, 10);

                // updating the users password in db
                const updatedUser = await User.finOneAndUpdate(existingUser._id,{
                    password:hashPass
                })

                console.log(updatedUser);

                // sending mail that password has changed
                mailSender(existingUser.email, "Password Changed", "<h1>You've successfully changed password</h1>")

                // return response
                return res.status(200).json({
                    success:true,
                    message:"Password changed successfully"
                })
            }else{
                //password doesn't matched so sending response
                return res.status(400).json({
                    success:false,
                    message:"Password doesn't matched "
                })
            }

        }else{
            //user entred wrong password
            return res.status(400).json({
                success:false,
                message:"Please enter correct password "
            })
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while changing password. Please try again"
        })
    }
}