import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { apiConnector } from '../../services/apiConnector';
import { auth } from '../../services/apis';

const LoginForm = () => {

    const [formData, setFormData] = useState({email:"", password:""});
    const [showPassword, setShowPassword] = useState(false);
    const changeHandler = (event) => {
        const {name, value} = event.target;
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const submitHandler = async() => {
        try{
            const userData = await apiConnector("POST", auth.LOGIN_API);
            console.log("User logged in sucessfully");
        }
        catch(err){
            console.log(err);
        }
        
    }
    console.log("loginform rendered");


  return (
        <form className='w-[60%] flex  flex-col justify-between gap-5 mt-5' onSubmit={submitHandler}>
                <label>
                    <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        placeholder='Enter email address'
                        type='email'
                        name='email'
                        onChange={changeHandler}
                        value={formData.email}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                        className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                    />
                </label>

                <label className='relative'>
                    <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                        Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        placeholder='Enter Password'
                        type='password'
                        name='password'
                        onChange={changeHandler}
                        value={formData.password}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                        className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                        
                    />
                    <span onClick={()=>setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {
                            showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                            :
                            (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                        }
                    </span>
                    <Link to="/forgot-password">
                        <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                            Forgot Password ?
                        </p>
                    </Link>
                </label>
        </form>
 
  )
}

export default LoginForm