const Profile = require('../models/Profile');
const User = require('../models/User');

exports.updateProfile = async(req, res) => {
    try{

        //get data
        const {dateOfBirth="", about ="", gender, contactNumber} = req.body;
        
        //find id
        const id = req.user.id;

        //validation
        if(!gender || !contactNumber || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //find profile
        const user = await User.findById({id}).populate;
        const profileId = user.additionalDetails;
        const profileDetails = await Profile.findById({id:additionalDetails._id});

        //update profile

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber
        await profileDetails.save();

    }
    catch(err){

    }
}

