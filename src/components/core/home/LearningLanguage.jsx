import React from 'react'
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguage = () => {
  return (
    <div className=''>
        <div className="text-4xl font-semibold text-center my-10 ">
            Your swiss knife for
            <HighlightText text={"learning any language"} />
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
        </div>


        <div className='relative flex items-center mt-8'>
            <img
                src={Know_your_progress}
                alt=""
                className="object-contain left-[10rem] absolute"
            />
            <img
                src={Compare_with_others}
                alt=""
                className="object-contain left-[30rem] absolute"
            />
            <img
                src={Plan_your_lessons}
                alt=""
                className="object-contain ml-[50rem] z-30"
            />
        </div>

        <div className='w-fit mx-auto mt-5 h-[150px] flex items-start justify-center'>
            <CTAButton active={true} linkTo={'/signup'}>

                Learn More

            </CTAButton>
        </div>
        

    </div>
  )
}

export default LearningLanguage