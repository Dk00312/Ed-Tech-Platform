const express = require('express');
const profileRoutes = express.Router();

const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
// profileRoutes.delete("/deleteProfile", auth, deleteAccount)
profileRoutes.put("/updateProfile", auth, updateProfile)
// profileRoutes.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
// profileRoutes.get("/getEnrolledCourses", auth, getEnrolledCourses)
// profileRoutes.put("/updateDisplayPicture", auth, updateDisplayPicture)
// profileRoutes.get("/instructorDashboard", auth, isInstructor, instructorDashboard)


module.exports = profileRoutes;