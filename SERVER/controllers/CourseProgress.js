const Course = require('../models/Course');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress');


exports.addCourseProgress = async(req, res) => {
    try{
        //getting data
        const {courseId, videoId} = req.body;
        const userId = req.user.id;

        //finding user
        const user = await User.findById({userId});

        //checking if courseProgressSchema already exist or not 
        if(!user.courseProgress){
            //create DB entry for courseProgress
            const newCourseProgress = await CourseProgress.create({
                courseId:courseId,
                completedVideos:null
            })

            // update user with updated course progress field
            await User.findByIdAndUpdate(
                {
                    userId
                },
                {
                    courseProgress:newCourseProgress._id
                }
            )
        }

        // adding video in courseProgress
        await CourseProgress.findByIdAndUpdate(
            {courseId},
            {
                $push:{
                    completedVideos:videoId
                }
            }
            )

        return res.status(200).json({
            success:true,
            message:"Video completed successfully"
        })



    }catch(err){

        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while adding videos in completed list"
        })

    }
}

exports.removeCourseProgress = async(req, res) => {
    try{
        //getting data
        const {courseId, videoId} = req.body;
        const userId = req.user.id;

        //finding user
        const user = await User.findById({userId});

        //checking if courseProgressSchema already exist or not 
        if(!user.courseProgress){
            return res.status(400).json({
                success:false,
                message:"You haven't completed any course"
            })
        }

        // removing video in courseProgress
        await CourseProgress.findByIdAndUpdate(
            {courseId},
            {
                $pull:{
                    completedVideos:videoId
                }
            }
            )

        return res.status(200).json({
            success:true,
            message:"Video removed successfully"
        })



    }catch(err){

        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while removing video from completed list"
        })

    }
}