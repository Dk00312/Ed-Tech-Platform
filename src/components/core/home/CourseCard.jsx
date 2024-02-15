import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
const CourseCard = ({courseData, currentCard, setCurrentCard }) => {
  return (
    <div className={` flex flex-col gap-5 w-[30%]
    ${currentCard === courseData?.heading 
    ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 text-richblack-500"
    : "bg-richblack-800 text-white cursor-pointer h-[300px]"}`}
      onClick={()=>setCurrentCard(courseData.heading)}
    >
        <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
            <h1
                className=' font-semibold text-[20px]'
            >{courseData.heading}</h1>

            <div className='text-richblack-400'>
                
                    {courseData.description}
                
            </div>
        </div>        

        <div
        className={`flex justify-between 
         "text-richblack-300"
         px-6 py-3 font-medium`}
      >
        {/* Level */}
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <p>{courseData.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{courseData.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard