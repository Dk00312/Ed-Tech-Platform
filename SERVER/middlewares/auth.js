const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async(req, res, next) => {
    try{

        const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");
        //if token is missing

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        //verify the token
        try{

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;

        }catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

//isStudent 

exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType != "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route foor students only"
            })
            
        } 
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType != "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route foor Instructor only"
            })
            
        } 
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

exports.isAdmin = async(req, res, next) => {
    try{
        
       
        const user = await User.findById({_id:req.user.id})
        console.log(user);
        console.log(user.accountType);
        if(user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route foor Admin only"
            })
            
        } 
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

