import React from 'react'

const TimeLine = ({logo, heading, description}) => {
  return (
    <div className='flex gap-[2rem]'>

        
        <img src={logo} className='w-[40px] h-[40px] bg-white rounded-full flex justify-center 
                                        items-center shadow-[#00000012] shadow-[0_0_62px_0]'/>

        <div className='flex flex-col'>
            <h1 className="font-semibold text-[18px]">
                {heading}
            </h1>

            <p className="text-base">
                {description}
            </p>
        </div>
        


    </div>
  )
}

export default TimeLine