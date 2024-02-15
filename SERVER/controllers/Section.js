const Course = require('../models/Course');
const Section = require('../models/Section');

exports.createSection = async(req, res) => {

    try{

        //fetch data
        const {sectionName , courseId} = req.body;
        //validation
        if(!sectionName || !courseId) {
            return res.status(404).json({
                success:false,
                message:"Properties not found"
            })
        }

        // create new section 
        const newSection = await Section.create({
            sectionName
        })
        // update course with new Section

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {courseId},
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
        ).populate("courseContent").exec();

        // return response

        return res.status(200).json({
            success:true,
            message:"Course section created successfully",
            newSection
        })

    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while creating section"
        })
    }
}

exports.updateSection = async(req, res) => {
    try{

        //fetch data
        const {sectionName, sectionId} = req.body;
        
        //validation
        if(!sectionName){
            return res.status(404).json({
                success:false,
                message:"Enter section name"
            })
        }

        //change section name
        const updatedSection = await Section.findByIdAndUpdate(
            {sectionId},
            
            {
                sectionName:sectionName
            },
            {new:true}
        );


        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully changed the section name",
            updatedSection
        })

    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while updating section"
        })

    }
}

exports.deleteSection = async(req, res) => {
    
    try{
    //fetch data
    const {sectionId, courseId} = req.body;
        
    //validation
    if(!sectionName){
        return res.status(404).json({
            success:false,
            message:"Enter section name"
        })
    }

    //change section name
    const deletedSection = await Section.findByIdAndDelete({sectionId});

    // delete section from courses 

    const updatedCourse = await Course.findByIdAndUpdate({courseId},{
        $pull:{
            courseContent:sectionId
        }
    }).populate('courseContent').exec();

    // return response
    return res.status(200).json({
        success:true,
        message:"Successfully delted the section",
        updatedSection
    })
    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while deleting section"
        })
    
    }

}