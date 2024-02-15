import React from 'react'
import HighlightText from '../core/home/HighlightText'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import FrameImage from '../../assets/Images/frame.png';
import SVG from "../../assets/svg/J05znW029v3g62vM1P.gif";
import CTAButton from '../core/home/CTAButton';


const Template = ({heading, text, highlightText, btn, formType}) => {
  return (
    <div className='flex  w-[100vw] h-[100vh] justify-center items-center ml-7 '>

        {/* input section */}
        <div className='flex flex-col w-[50%] '>
            <div className='flex flex-col text-white w-[70%] gap-7'>
                <h1 className='text-4xl '>
                    {heading}
                </h1>

                <p className='text-richblack-100'>
                    {text}
                    <br></br>
                    <div className='text-blue-100'>
                        {
                            highlightText
                        }
                    </div>
                    
                </p>
            </div>



            <div className='w-full'>
                {
                    formType === "signup" ? 
                    (<SignupForm/>)
                    :
                    <LoginForm/>
                }
            </div>


            <div className='w-[60%] mt-10'>
                <CTAButton active={true}>
                    {btn}
                </CTAButton>
            </div>
        </div>
        

        {/* image section */}
        <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0 '>
       
            <img
                src={FrameImage}
                alt=''
                width={558}
                height={504}
                loading="lazy"
            />

            <img 
                src={SVG}
                alt=''
                width="450px"
                height="300px"
                loading="lazy"
                className="absolute -top-[3.5rem] right-4 z-10"
            />

       
        </div>
        
    </div>
  )
}

export default Template