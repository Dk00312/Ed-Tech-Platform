const crypto = require('crypto');

function generateOTP(length) {
  const buffer = crypto.randomBytes(length);
  const otp = buffer.toString('hex').toUpperCase().slice(0, length);
  return otp;
}

// Example: Generate a 6-digit OTP
const uniqueOTP = generateOTP(6);
console.log('Unique OTP:', uniqueOTP);