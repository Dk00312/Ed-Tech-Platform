import React, { useState } from 'react';
import Tab from '../common/Tab';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { auth } from '../../services/apis';
import { apiConnector } from '../../services/apiConnector';
import toast from 'react-hot-toast';

const SignupForm = () => {
    const [accountType, setAccountType] = useState("Student");
    const [formData, setFormData] = useState({firstName:"", lastName:"", email:"", password:""
                                                , confirmPassword:""});

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const changHandler = (event) => {
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
            const userData = await apiConnector("POST", auth.SIGNUP_API);
            console.log("User logged in sucessfully");
            toast.success("Userloggedin")
        }
        catch(err){
            console.log(err);
        }
        
    }                                       
    

  return (
    <div className='w-[60%]'>
        {/* content section */}
        <div className=''>
            <Tab accountType={accountType} setAccountType={setAccountType} />
            <form className='w-full flex  flex-col justify-between gap-5' onSubmit={submitHandler}>
                <div className='flex justify-between '>
                    <label>
                        <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            placeholder='Enter first name'
                            type='text'
                            name='firstName'
                            value={formData.firstName}
                            onChange={changHandler}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                            className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                        />
                    </label>

                    <label>
                        <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            placeholder='Enter last name'
                            type='text'
                            name='lastName'
                            value={formData.lastName}
                            onChange={changHandler}
                             style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                            Email Address <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            placeholder='Enter email address'
                            type='text'
                            name='email'
                            value={formData.email}
                            onChange={changHandler}
                             style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                        />
                    </label>
                </div>
                
                <div className='flex justify-between'>
                    <label className='relative'>
                        <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            placeholder='Enter Password'
                            type={showPassword ? 'text':'password'}
                            name='password'
                            value={formData.password}
                            onChange={changHandler}
                             style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                        />

                        <span onClick={()=> setShowPassword(!showPassword)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    <label className='relative'>
                        <p className='text-richblack-5 leading-[1.375rem] mb-1 text-[0.875rem]'>
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            placeholder='Confirm Password'
                            type={showConfirmPassword ? 'text':'password'}
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={changHandler}
                             style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className='bg-richblack-700 w-full rounded-[0.5rem] p-3'
                        />
                        <span onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
                            className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                        >
                            
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="white" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                </div>
            

            </form>
        </div>
        
    </div>  
  )
}

export default SignupForm
