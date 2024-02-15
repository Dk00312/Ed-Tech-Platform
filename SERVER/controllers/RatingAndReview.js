const User = require('../models/User');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');
const { default: mongoose } = require('mongoose');

exports.createRating = async(req, res, next) => {
    try{

        //fetching user id from token
        const userId = req.user.id;

        //fetching data from requrests body
        const {courseId, rating, review} = req.body;

        //validation
        if(!courseId || !rating || !review || !userId){
            return res.status(400).json({
                success:false,
                message:"All properties are required",
            })
        }

        //check if user is enrolled in course or not
        const course = await Course.findOne(
            {
                _id:courseId,
                studentsEnrolled:{$elemMatch: {$eq : userId}}
            }
        );

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course"
            })
        }



       // // checking if user has already reviwed the course or not
       
        // const reviews = course.ratingAndReviews;
        // if(reviews.map((review)=>{
        //     if(review.user === userId){
        //         return res.status(400).json({
        //             success:false,
        //             message:"User has already rated the course",
        //         })
        //     }
        // }));

        // checking if user has already reviwed the course or not
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId
            }
        ) 

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            })
        }


        // //getting user 
        // const user = await User.findById({userId});
        // var hasBought = null;

        // //checking if user has bought the course or not
        // // user.courses.map((course)=>{
        // //     if(course._id === courseId){
        // //         hasBought = 1;
        // //     }
        // // })
        
        // if(!hasBought){
        //     return res.status(400).json({
        //         success:false,
        //         message:"User hasn't bought the course"
        //     })
        // }

        //creating DB entry
        const newReview = await RatingAndReview.create({
            course:courseId,
            user:userId,
            rating:rating,
            review:review
        })

        //updating course with new review
        await Course.findByIdAndUpdate(
            {courseId},
            {
                $push:{
                    ratingAndReviews:newReview._id,
                }
            },
            {new:true}
        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Rating given successfully",
        })


    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while giving ratings"
        })

    }
}

exports.getAverageRating = async(req, res) => {
    try{

        // getting courseId from request body
        const {courseId} = req.body;

        // calcualting avreage rating 

        const result = await RatingAndReview.aggregate(
            [
                {
                    $match:{
                        course:new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating:{$avg:"$rating"},
                    }
                }
            ]
        )


        //return rating

        //if no rating review exist
        if(result.length === 0){
            return res.status(200).json({
                success:true,
                message:"Average rating is 0, no rating till now",
            })
        }
        
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating,
        })

        

    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while getting average rating"
        })

    }
}

//get All rating and review

exports.getAllRating = async(req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image"
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName",
                                            })
                                            .exec();

        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        })

    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while getting all rating"
        })
    }
}