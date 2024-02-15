const Course = require('../models/Course');

const Category = require('../models/Category');
const User = require('../models/User');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();

// create course

exports.createCourse = async(req, res) => {
    try{

        //fetchData
        const {courseName, courseDescription, whatYouWillLearn, category, price} = req.body;
        
        //getThumbnail
        const thumbnail = req.files.thumbNailImage;

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !category || !price){
            return res.status(400).json({
                sucess:false,
                message:"All fields are required"
            })
        }

        //getuser details
        const userId = req.user.id;
        const instructorDetails = await User.findById({userId});

        //check if instructor exist or not
        if(!instructorDetails){
            return res.status(404).json({
                sucess:false,
                message:"Instructor not found"
            })
        }

        //check if category exist or not
        const categoryDetails = await Category.find(category);
        if(!categoryDetails){
            return res.status(404).json({
                sucess:false,
                message:"Catgory not found"
            })
        }

        //upload image to cloudinary
        const thumbNailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            instructor:instructorDetails._id,
            price,
            category:categoryDetails._id,
            thumbnail:thumbNailImage.secure_url
        })

        //update User Courses
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
        )

        //update category schema
        await Category.findByIdAndUpdate(

            {_id:categoryDetails._id},

            {
                $push:{
                    course:categoryDetails._id
                }
            },

            {new:true}

        )

        return res.status(200).json({
            sucess:false,
            message:"Course created successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            sucess:false,
            message:"Course can't be created"
        })
    }
}


// getAll Courses

exports.getAllCourses = async(req, res) => {
    try{

        const courses = await Course.find({}, {
            courseName:true, 
            price:true, 
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true
        }).populate('instructor').exec();
        if(!courses){
            return res.status(404).json({
                sucess:false,
                message:"Courses not found"
            })
        } 

        return res.status(200).json({
            sucess:true,
            message:"Courses fetched successfully",
            data:courses
        })

    }catch(err){

        console.log(err);
        return res.status(500).json({
            sucess:false,
            message:"Cant not fetch courses"
        })

    }
}
