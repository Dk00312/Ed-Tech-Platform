import React from 'react'
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import HighlightText from '../components/core/home/HighlightText';
import CTAButton from '../components/core/home/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlock from '../components/core/home/CodeBlock';
import { Footer } from '../components/common/Footer';
import { FaArrowRight } from 'react-icons/fa';
import TimeLines from '../data/timeline';
import TimeLine from '../components/core/home/TimeLine';
import TimeLineImage from '../assets/Images/TimelineImage.png';
import LearningLanguage from '../components/core/home/LearningLanguage';
import ExploreMore from '../components/core/home/ExploreMore';
import InstructorSection from '../components/core/home/InstructorSection';
import ReviewSlider from "../components/common/ReviewSlider"


const Home = () => {
  return (
    <div>
        {/* section - 1 */}

        <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
            <Link to='/signup'>
                <div className="group mt-16 p-1 font-bold bg-richblack-800  rounded-full mx-auto 
                text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-md shadow-white">
                    <div className="flex justify-between items-center gap-2 rounded-full
                        py-[10px] px-8  hover:bg-richblack-900 hover:shadow-lg">
                        <p>Become An Instructor </p> 
                        <GoArrowRight className="text-white"/> 
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-8'>
                Empower Your future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className="mt-8 w-[70%] text-center text-lg font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, from
                anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from
                instructors.
            </div>

            {/* Call To Action (CTA) buttons */}
            <div className='flex gap-10 mt-[3.5rem] items-center'>
                <CTAButton active={true} linkTo='/signup'>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkTo='/login'>
                    Book a Demo
                </CTAButton>
            </div>  

            {/* Video */}
            <div className="mx-3 my-7 mt-[5rem] shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-[80%]">
            <video
                className="shadow-[20px_20px_rgba(255,255,255)]"
                muted
                loop
                autoPlay
            >
                <source src={Banner} type="video/mp4" />
            </video>
            </div>

            <div className='flex w-[90%]'>
              {/* code block -1  */}
                <CodeBlock
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"Coding Potential "}/>
                            with our online courses
                        </div> 
                    }
                    subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }

                    ctabtn1={{
                        active:true,
                        text:'Try It Yourself',
                        linkTo:'/signup,'
                    }  
                    }

                    ctabtn2={{
                        active:false,
                        text:'Learn More',
                        linkTo:'/signup,'
                    }  
                    }

                    codeColor={'text-yellow-400'}
                    codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}

                />
            </div>
            
            <div>
              {/* code block - 2  */}
          <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              text: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-400"}
            codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore/>

        </div>
      

        {/* section - 2 */}


        
        <div className='bg-pure-greys-5 text-richblack-700 h-full w-full'>
            <div className='homepage_bg h-[320px]'>
              <div className=' mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                  <div className="lg:h-[150px]"></div>
                  <div className="flex flex-row gap-7 text-white lg:mt-8">
                        <CTAButton active={true} linkto={"/signup"}>
                          <div className='flex items-center gap-2'>
                            Expore Full Catalog
                            <FaArrowRight/>
                          </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/login"}>
                        <div className='flex items-center gap-2'>
                            Learn More
                            <FaArrowRight/>
                          </div>
                        </CTAButton>   
                  </div>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-maxContent items-center justify-between gap-8">
              <div className='mt-[2rem] mb-[5rem] flex flex-col justify-between gap-7  lg:flex-row lg:gap-0'>
                <div className="text-4xl font-semibold lg:w-[80%] ">
                  Get the skills you need for a 
                  <HighlightText text="job that is in demand."/> 
                </div>
              </div>

              <div className="flex flex-col items-start gap-10 lg:w-[50%] mt-[6rem] mb-[5rem]">
                <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </p>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
              </div>

            </div>

            <div className='flex justify-between '>
                  <div className='flex flex-col gap-2 items-start pl-[15rem]'>
                        {
                          TimeLines.map((element,i)=> {
                            return(
                              <div className='flex flex-col lg:gap-3'>
                                    <TimeLine 
                                      logo={element.Logo}
                                      heading={element.Heading}
                                      description={element.Description}
                                    />
                                    <div
                                        className={`hidden ${
                                          TimeLines.length - 1 === i ? "hidden" : "lg:block"
                                        }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                                    ></div>
                                </div>
                              
                            )
                          })
                        }

                  </div>

                  <div className='relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px] mb-[7rem] mr-[10rem]'>
                        <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%]
                               bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 '>
                            <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-10 lg:px-14'>
                              <h1 className="text-3xl font-bold w-[75px]">10</h1>
                              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">Years Experience</h1>
                            </div>

                            <div className="flex gap-5 items-center lg:px-14 px-7">
                              <h1 className="text-3xl font-bold w-[75px]">250</h1>
                              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                                types of courses
                              </h1>
                            </div>
                        </div>
                        
                        <div>
                        <img
                          src={TimeLineImage}
                          alt="timelineImage"
                          className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[450px]"
                        />
                        </div>
                        
                  </div>
              </div>


             
            <LearningLanguage/>
                      


        </div>

        {/* section - 3 */}
        
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}

        <ReviewSlider/>
      </div>

        {/* footer */}

        <Footer/>

    </div>
  )
}


export default Home