import React from 'react'
import { NavLink } from 'react-router-dom'

const FooterBlock = ({heading, resources, link}) => {
    
  return (
    <div className='flex flex-col gap-3'>
        <h1 className='text-xl text-richblack-50 '>
            {heading}
        </h1>
        
        <div className='flex flex-col justify-between text-richblack-400 gap-2'>
            {
                link ? (
                            resources.map((resource)=> {
                                return(
                                    <NavLink to={resource.link}>
                                        <p>
                                            {resource.title}
                                        </p>
                                    </NavLink>
                                )
                                
                            })
                       
                ):
                (
                    resources.map((resource)=>{
                        return(
                            <p>{resource}</p>
                        )
                    })
                )
                
            }
        </div>
  
    </div>
  )
}
export default FooterBlock