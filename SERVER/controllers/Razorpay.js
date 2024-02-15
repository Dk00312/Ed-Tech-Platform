const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailTemplate = require('../mail/templates/courseEnrollmentEmail');
const mailsender = require('../utils/mailSender');
const { default: mongoose } = require('mongoose');

exports.capturePayment = async(req, res) => {
  try{

    //get course id 
    const {course_id} = req.body;
    if(!course_id){
      return res.status(400).json({
        success:false,
        message:"Please provide valid course ID"
      })
    }
    //get user id
    const userId = req.user.id;
    
    //valid course 
    const isCourse = await Course.findById({courseId});
    if(!isCourse){
      return res.status(404).json({
        success:false,
        message:"Course not found"
      })
    }

    
    const uid = mongoose.Schema.ObjectId(userId);

    //check if user has already bought the course

    if(isCourse.studentsEnrolled.includes(uid)){
      return res.status(400).json({
        success:false,
        message:"User already bought the course"
      })
    }

    try{
      
      const amount = isCourse.price;
      const currency = "INR";

      const options = {
        amount:amount*100,
        currency:currency,
        reciept:Math.random(Date.now()).toString(),
        notes:{
          courseId:course_id,
          userId
        }
      }

      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success:true,
        courseName : isCourse.courseName,
        courseDescription : isCourse.courseDescription,
        thumbnail : isCourse.thumbnail,
        amount : amount,
        currency:paymentResponse.currency,
        orderId : paymentResponse.id
      })

    }catch(err){

      console.log(err);
      res.status(500).json({
        success:false,
        message:"Error while paymenting"

      })
    } 
    
    


  }catch(err){

    console.log(err);
      return res.status(500).json({
        success:false,
        message:"Could not initiate order",
      })
  }
}


//verify payment

exports.verifyPayment = async(req, res) => {
  try{

    const webhookSecret = "12345678";
    
    const signature = req.headers["x-razorpay-signatur e"];
    
    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
      console.log("payement is authorized");

      const {courseId, userId} = req.body.payload.payment.entity.notes;
      try{

        //getting the course adn adding the student in the course
        const enrolledCourse = await Course.findOneAndUpdate(
          {_id:courseId},
          {
            $push:{
              studentsEnrolled:userId
            }
          },
          {new:true}
        )

        if(!enrolledCourse){
          return res.status(404).json({
            success:false,
            message:"Course not found",
          })
        }

        //finding the student and adding course to its enrolled course list

        const enrolledStudent = await User.findOneAndUpdate(
          {_id:userId},
          {
            $push:{
              courses:courseId,
            }
          },
          {new:true}
        )

        //send confirmation mail
        const emailResponse = await mailsender(
                                  enrolledStudent.email,
                                  "Congrats",
                                   mailTemplate(enrolledCourse.title, enrolledStudent.firstName)
                                )

        return res.status(200).json({
          success:true,
          message:"Signature verified and Course added"
        })                        


      }catch(err){

      }
    }
    else{
      return res.status(400).json({
        success:false,
        message:"Invalid Request"
      })
    }

  }catch(err){

  }
}