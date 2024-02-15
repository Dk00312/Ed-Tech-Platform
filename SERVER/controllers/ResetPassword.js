const User = require('../models/User');
const mailSender = require('../utils/mailSender');


// resetPasswordToken
exports.resetPasswordToken = async(req, res) => {
    try{
        // fetching data
        const {email} = req.body;

        //check user for email
        const user = await User.findOne({email})

        // check if user exist or not
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Your email is not registered with us"
            })
        }

        //generate token
        const token = crypto.randomUUID();
        
        
        // update user by adding token and expiration time 
        const updateDetails = await User.findOneAndUpdate({email:email},{
            token:token,
            resetPasswordExpires:Date.now() + 5 * 60 * 1000 ,
        },{new:true})

        //create URL
        const url = `http://loclahost:3000/update-password/${token}`

        // send mail 
        await mailSender(email, "Password Reset Link", `Password reset link ${url}`)

        // return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully , please check email and change pwd "
        })

    }catch(err){

        console.log(err);
        res.status(500).json({
            success:false,
            message:"Error while reseting password"
        })
    }
} 

//resetPassword 

exports.resetPassword = async(req, res) => {
    try{

        const {password, confirmPassword , token } = req.body;

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password not matching"
            })

        }

        // get userdetails from db using token

        const userDetails = await User.findOne({token:token});
        if(!userDetails) {
            res.status(400).json({
                success:false,
                message:"Token is invalid"
            })
        }

        // token expired or not

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token is expired, please regenrate your link"
            })
        }

        // hashing pass

        const hashPass = await bcrypt(password,10);

        //password update

        await User.findOneAndUpdate(
            {token:token},
            {password:hashPass},
            {new:true}
        )

        // return respopnse 
        return res.status(200).json({
            success:true,
            message:"Passwrod reset succesful "
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error while reseting password"
        })


    }
}