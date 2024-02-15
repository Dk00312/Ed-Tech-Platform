import React from 'react'
import Template from '../components/auth/Template'
import SignupImage from "../assets/Images/signup.webp";

const SignUp = () => {
  return (
    <Template
        heading={"Join the millions learning to code with StudyNotion for free"}
        text={"Build skills for today, tomorrow, and beyond."}
        highlightText={"Education to future-proof your career."}
        btn={"Create Account"}
        formType={"signup"}
        image={SignupImage}

    />
  )
}

export default SignUp