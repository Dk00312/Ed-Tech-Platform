import React from 'react'
import Template from '../components/auth/Template';
import LoginImage from '../assets/Images/login.webp'

const Login = () => {
  return (
    
      <Template
        heading={"Welcome Back"}
        text={"Build skills for today, tomorrow, and beyond."}
        highlightText={"Education to future-proof your career."}
        btn={"Create Account"}
        formType={"login"}
        image={LoginImage}

    />
    
  )
}

export default Login