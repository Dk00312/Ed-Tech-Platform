import React from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import FooterBlock from './FooterBlock';
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { FooterLink2 } from '../../data/footer-links';

export const Footer = () => {


    const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
    const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
    ];
    const Plans = ["Paid memberships", "For students", "Business solutions"];
    const Community = ["Forums", "Chapters", "Events"];
    const Company = ["About", "Careers", "Affiliates"];
    const Support = ["Help Center"]

  return (
    <div className='bg-richblack-800'>   
        {/* sect-1 */}
        <div className="flex">

            {/* subsec-1.1 */}
            <div className='flex gap-[4rem] justify-between w-[50%] pl-[7rem] pt-[5rem] pr-[5rem]'>

                {/* main-div-1 */}
                <div className='flex flex-col '>

                    <div>
                        <img src={Logo}></img>

                    </div> 

                    <div className='flex flex-col mt-4 gap-7'>
                        <FooterBlock
                            heading="Company"
                            resources={Company}
                            link={false}
                        />

                        <div className='flex gap-4 text-lg text-richblack-400 '>
                            <FaFacebook/>
                            <FaGoogle/>
                            <FaTwitter/>
                            <FaYoutube/>
                        </div>   
                        
                    </div>


                </div>


                {/* Main-div-2 */}
                <div className='flex flex-col gap-7'>

                        <FooterBlock
                            heading="Resources"
                            resources={Resources}
                            link={false}
                        />

                        <FooterBlock
                            heading="Support"
                            resources={Support}
                            link={false}
                        />

                </div>

                {/* Main-div-3 */}

                <div className='flex flex-col gap-7'>

                    <FooterBlock
                        heading="Plans"
                        resources={Plans}
                        link={false}
                     />

                    <FooterBlock
                        heading="Community"
                        resources={Community}
                        link={false}
                     />

                </div>

            </div>
            <div className='w-[5px] lg:border-r lg:border-richblack-700 h-[600px] mt-[5rem]'>
                
            </div>
            {/* subsec-1.2 */}

            <div className='flex justify-between w-[50%] pl-[5rem] pt-[5rem] pr-[7rem]'>
                {
                    FooterLink2.map((section)=>{
                        return(
                            <FooterBlock
                                heading={section.title}
                                resources={section.links}
                                link={true}
                            /> 
                        )
                    })
                }
            </div>

        </div>

        {/* sect-2 */}

        <div className='flex justify-between border-t border-richblack-700 w-[85%] mt-10 text-md  ml-[7rem] p-8 pt-[4rem] pb-[4rem]'>
            <div className=' text-richblack-400  flex justify-between items-center w-[20%] ml-7 '>
               <div className='border-r border-richblack-700 pr-3'>
                    Privacy  
               </div>
               <div className=' items-center justify-center flex border-r border-richblack-700 pr-3'>
                    Cookie Policy  
               </div>
               <div className='border-r border-richblack-700 pr-3'>
                    Terms
               </div>

            </div>

            <div className='text-center text-richblack-400  flex justify-between items-center ml-7 '>
                <p>Made with ❤️ CodeHelp © 2023 Studynotion</p>
            </div>
        </div>


    </div>
  )
}
