import React, { lazy, useEffect, useState } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import Logo  from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs"
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';


const Navbar = () => {
    // const [currentTab, setCurrentTab] = useState(0);
    
    const location = useLocation();
    const {user} = useSelector((state)=> state.profile);
    const {token} = useSelector((state) => state.auth);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const newSubLinks = [
        "Python",
        "Web Development",
        "Android Development",
        "Blockchain",
        "Machine Learning",
        "Artificial Intelligence",
        "Devops",
        "Data Science",
        "Cloud Computing"
    ];


    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
    const BASE_URL = process.env.REACT_APP_BASE_URL
    console.log("printing base url");
    console.log(BASE_URL);

    useEffect(()=>
    {
        (
               
                async() => {
                try{    
                    const res = await apiConnector("GET", categories.CATGORIES_API);
              
                    setSubLinks(res.data.data);
                    
                    
                }
                catch(err){
                    console.log("eror while request",err);
                }
            }
        ) ()
    }
    , [])

    console.log(subLinks);


    return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

            {/* logo */}
            <Link to={"/"}>
                <img 
                    src={Logo}
                    alt="" 
                    width={160}
                    height={32}
                    loading={lazy}
                />
            </Link>

            {/* nav-links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link, idx)=>(
                            <li key={idx}>
                                {           
                                    link.title ==="Catalog" ? (
                                        <div className='group relative'>   
                                            <p className='flex justify-between items-center gap-1 cursor-pointer'>
                                                {link.title} 
                                                <BsChevronDown className=''/>
                                            </p>
                                            <div className='invisible opacity-0 w-[300px] h-[fit] absolute bg-richblack-5 flex flex-col z-[100]
                                                group-hover:visible group-hover:opacity-100  translate-x-[-40%] p-3 rounded-lg 
                                                translate-y-[1rem] transition-all duration-200 
                                            '
                                            >
                                                <div className='absolute inivisible opacity-0 w-[30px] h-[30px] bg-transparent rotate-45 translate-x-[10rem] 
                                                    group-hover:visible group-hover:opacity-100 group-hover:bg-richblack-5 translate-y-[-1.2rem] rounded-md -z-10 transition-all duration-200'>
                                            </div>
                                                
                                            {
                                                subLinks.length ? (subLinks.map((subLink) =>{
                                                    return (
                                                    
                                                            
                                                            <div className='flex justify-start items-center rounded-lg bg-transparent py-4 pl-4 
                                                                hover:bg-richblack-50 cursor-pointer text-richblack-700 transition-all duration-200'>
                                                                {subLink.name}
                                                                
                                                            </div>
                                        
                                                            
                                                    )
                                                }))
                                                :
                                                (
                                                    <div className='flex justify-start items-center rounded-lg bg-transparent py-4 pl-4 
                                                    hover:bg-richblack-50 cursor-pointer text-richblack-700 transition-all duration-200'>
                                                        No Categories Found
                                                    </div>    
                                                )

                                            }
                                                
                                            </div>
                                            
                                            
                                        </div>
                                    )
                                    :
                                    (
                                        <Link to={link.path}>
                                            <p 
                                            // className={`${currentTab === idx ? "text-yellow-25":"text-richblack-500"}`}
                                                className={`${matchRoute(link.path) ?"text-yellow-25":"text-richblack-25"}  `}
                                                // onClick={()=> setCurrentTab(idx)}
                                            >
                                                {link.title}
                                            </p>
                                            
                                        </Link>
                                    )
                                }
                            </li>
                        )
                        )
                    }
                </ul>
            </nav>

            <div className='flex justify-between items-center gap-x-4'>
                {
                    user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
                        (
                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 &&(
                                        <span className='absolute'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    
                }

                {
                    token ===null && (
                        <Link to="/login">
                            <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 text-richblack-100 p-2'>
                                Log In
                            </button>
                        </Link>
                        
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 text-richblack-100 p-2'>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
            </div>

        </div>

    </div>
  )
}

export default Navbar