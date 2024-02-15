const express = require('express');
const userRoutes = express.Router();

// Import the required controllers and middleware functions
const {
    login,
    signup,
    sendOTP,
    changePassword,
  } = require("../controllers/Auth")
  const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/ResetPassword")
  
  const { auth } = require("../middlewares/auth")
  
  // Routes for Login, Signup, and Authentication

  // Authentication routes

  // Route for user login
  userRoutes.post("/login", login)
  
  // Route for user signup
  userRoutes.post("/signup", signup)
  
  // Route for sending OTP to the user's email
  userRoutes.post("/sendotp", sendOTP)
  
  // Route for Changing the password
  userRoutes.post("/changepassword", auth, changePassword)
  

  //Reset Password

  // Route for generating a reset password token
  userRoutes.post("/reset-password-token", resetPasswordToken)
  
  // Route for resetting user's password after verification
  userRoutes.post("/reset-password", resetPassword)
  

// Export the router for use in the main application
module.exports = userRoutes;