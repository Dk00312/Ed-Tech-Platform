const express = require('express');
const courseRoutes = express.Router();


// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
  } = require("../controllers/Course")
  
  
  // Categories Controllers Import
  const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")
  
  // Sections Controllers Import
  const {
    createSection,
    updateSection,
    deleteSection,
  } = require("../controllers/Section")
  
  // Sub-Sections Controllers Import
  const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
  } = require("../controllers/Subsection")
  
  // Rating Controllers Import
  const {
    createRating,
    getAverageRating,
    getAllRating,
  } = require("../controllers/RatingAndReview")
  
  const {
    updateCourseProgress
  } = require("../controllers/courseProgress");
  
  // Importing Middlewares
  const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
  
  // ********************************************************************************************************
  //                                      Course routes
  // ********************************************************************************************************
  
  // Courses can Only be Created by Instructors
  courseRoutes.post("/createCourse", auth, isInstructor, createCourse)
  //Add a Section to a Course
  courseRoutes.post("/addSection", auth, isInstructor, createSection)
  // Update a Section
  courseRoutes.post("/updateSection", auth, isInstructor, updateSection)
  // Delete a Section
  courseRoutes.post("/deleteSection", auth, isInstructor, deleteSection)
  // Edit Sub Section
  courseRoutes.post("/updateSubSection", auth, isInstructor, updateSubSection)
  // Delete Sub Section
  courseRoutes.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
  // Add a Sub Section to a Section
  courseRoutes.post("/addSubSection", auth, isInstructor, createSubSection)
  // Get all Registered Courses
  courseRoutes.get("/getAllCourses", getAllCourses)
  // Get Details for a Specific Courses
  // courseRoutes.post("/getCourseDetails", getCourseDetails)
  // Get Details for a Specific Courses
  // courseRoutes.post("/getFullCourseDetails", auth, getFullCourseDetails)
  // Edit Course routes
  // courseRoutes.post("/editCourse", auth, isInstructor, editCourse)
  // Get all Courses Under a Specific Instructor
  // courseRoutes.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
  // Delete a Course
  // courseRoutes.delete("/deleteCourse", deleteCourse)
  
  // courseRoutes.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
  
 
  //Category routes (Only by Admin)
  
  // Category can Only be Created by Admin
  // TODO: Put IsAdmin Middleware here
  courseRoutes.post("/createCategory", auth, isAdmin, createCategory)
  courseRoutes.get("/showAllCategories", showAllCategories)
  courseRoutes.post("/getCategoryPageDetails", categoryPageDetails)
  

  // Rating and Review
 
  courseRoutes.post("/createRating", auth, isStudent, createRating)
  courseRoutes.get("/getAverageRating", getAverageRating)
  courseRoutes.get("/getReviews", getAllRating)

module.exports = courseRoutes;