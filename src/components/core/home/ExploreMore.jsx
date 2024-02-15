import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const ExploreMore = () => {

    const [currentCourse, setCurrentCourse] = useState(HomePageExplore[0].tag);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const changeCourseHandler = (index) => {
        setCourses(HomePageExplore[index].courses);
        setCurrentCourse(HomePageExplore[index].tag);
        setCurrentCard(HomePageExplore[index].courses[0].heading);
    }

   

  return (
    <div className='translate-y-20'>
        <div className='flex flex-col '>

            <h1 className='text-4xl font-semibold text-center '>
                Unlcok the 
                <HighlightText text={"Power of Code"}/>
            </h1>

            <p className='text-center text-richblack-300 text-lg font-semibold mt-1'>
                Learn to Build Anything You Can Imagine
            </p>

        </div>

        {/* Tab Section */}
        <div className="lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 
                        p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                            {
                                HomePageExplore.map((element, index)=> {
                                    return(
                                        <div
                                            className={` text-[16px] flex flex-row items-center gap-2 ${
                                                currentCourse === element.tag
                                                ? "bg-richblack-900 text-richblack-5 font-medium"
                                                : "text-richblack-200"
                                            } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
                                            key={index}
                                            onClick={()=>changeCourseHandler(index)}

                                        >
                                         {
                                            element.tag
                                         }   
                                        </div>
                                    )
                                })
                            }
        </div>


        {/* card section  */}

        <div className='flex justify-between gap-[2rem] translate-y-20 w-[100%] h-[100%]'>

            {
                courses.map((course, index)=>{
                    return(
                        <CourseCard 
                            courseData={course}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    )
                })
            }

        </div>

    </div>
    
  )
}

export default ExploreMore