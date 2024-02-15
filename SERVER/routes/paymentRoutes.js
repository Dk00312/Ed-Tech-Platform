const express = require('express');
const paymentRoutes = express.Router();

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Razorpay")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
paymentRoutes.post("/capturePayment", auth, isStudent, capturePayment)
paymentRoutes.post("/verifyPayment",auth, isStudent, verifyPayment)
// paymentRoutes.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = paymentRoutes;