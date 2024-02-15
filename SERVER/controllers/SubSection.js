const SubSection = require('../models/SubSection');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
const Section = require('../models/Section')

exports.createSubSection = async(req, res) => {
    try{

        // fetching Data
        const { title, timeDuration, description, sectionId} = req.body;

        //fetch video file
        const video = req.files.videoFile;

        //validating
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // destructuring hours, minute and seconds from timeduration
        const {hrs, mins, secs} = timeDuration;

        // upload video to cloudinary
        const uploadFile = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // creatign DB entry
        const newSubSection = await SubSection.create({
            videoUrl:uploadFile.secure_url,
            title:title,
            description:description,
            timeDuration:{
                hrs:hrs,
                mins:mins,
                secs:secs
            }
        })

        console.log(newSubSection);

        //updating section with new subsection 
        const updatedSection = await Section.findByIdAndUpdate({sectionId},
            {
                $push:{
                    subSection:newSubSection._id
                }
            },
            {new:true}
            ).populate('subSection').desc();
        console.log(updatedSection);    

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedSection
        })


    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Can not create an subsection"
        })

    }

}


exports.updateSubSection = async(req,res) => {
    try{

        // fetching Data
        const { title, timeDuration, description, subSectionId} = req.body;

        //fetch video file
        const video = req.files.videoFile;

        //validating
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // destructuring hours, minute and seconds from timeduration
        const {hrs, mins, secs} = timeDuration;

        // upload video to cloudinary
        const uploadFile = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // creatign DB entry
        const newSubSection = await SubSection.findByIdAndUpdate({subSectionId},
            {
            videoUrl:uploadFile.secure_url,
            title:title,
            description:description,
            timeDuration:{
                hrs:hrs,
                mins:mins,
                secs:secs
            }
        })

        console.log(newSubSection);

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully",
            newSubSection
        })


    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Can not update an subsection"
        })

    }
}

exports.deleteSubSection = async(req,res) => {
    try{

        // fetching Data
        const { subSectionId ,sectionId} = req.body;

        //fetch video file
        const video = req.files.videoFile;

        //validating

        // creatign DB entry
        const deletedSubSection = await SubSection.findByIdAndDelete({subSectionId});

        //remove subsection from sections 

        const updatedSection = await Section.findByIdAndUpdate({sectionId}, {
            $pull:{
                subSection:sectionId
            }
        })

        //return response
        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully",
            updatedSection
        })


    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Can not delete an subsection"
        })

    }
}