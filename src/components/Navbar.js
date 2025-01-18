import React, { useEffect, useState } from 'react'
import iocl from "../images/Indian-Oil.png";
import xyma from "../images/xyma.png";
import { IoMdLogOut } from "react-icons/io";
import { useAlldata } from '../components/AlldataContext';
import { TbDeviceDesktopUp } from "react-icons/tb";
import { TbDeviceDesktopX } from "react-icons/tb";
import {useNavigate } from 'react-router-dom';


const Navbar = () => {
    const {activityStatus } = useAlldata();
    const [NavBar,setNavBarActivity]=useState()
    const onedata = activityStatus ? activityStatus : [];
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem("NavActivity");
        if (data) {
          setNavBarActivity(data);
        }
      }, []);

    const handleClick =(id)=>{
    localStorage.setItem("NavActivity",id)
    setNavBarActivity(id)
    if (id === 1) {
        navigate("/");
      }
      if (id === 2) {
        navigate("/Reports");
      }
        if (id === 3) {
            navigate("/Settings");
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
      };
  return (
    <div className='h-[100%] w-full space-y-1'>
        <div className='h-[70%] w-full  flex justify-between items-center'>
            <div className='text-white w-[20%]'>
                <div className="flex flex-col items-center justify-center">
                    <img src={iocl} className={`md:w-[25%] cursor-pointer duration-500`} />
                    <h1 className="text-white text-[10px] md:text-[15px] font-bold flex">Indian Oil</h1>
                </div>            
            </div>
            <div className='text-white w-[60%] flex justify-center items-center'>
               <h1 className="text-[6px] md:text-xl 2xl:text-4xl font-sans font-bold border-b-2 tracking-normal">
                    IOCL HALDIA - REFORMER TUBE TEMPERATURE MEASUREMENT
                </h1>
            </div>
            <div className='text-white w-[20%] flex items-center gap-2'> 
                <div className='flex justify-center w-full'>
                    <img src={xyma} className={`md:w-[50%] cursor-pointer duration-500`} /> 
                </div> 
                <div className='' onClick={logout}>
                    <IoMdLogOut className='text-[10px] md:text-[40px] mr-3 text-red-600 cursor-pointer'/>
                </div>
            </div>
        </div>
        <div className='text-white h-[26%] flex justify-between tracking-normal '>
            <div className='text-sm'>
                <span className='text-gray-200 font-bold 2xl:text-xl'>Reformer Tube No:</span><span className='ml-2 2xl:text-xl font-sans font-bold text-yellow-400'>43</span>
            </div>
            
            <div className='flex gap-4 font-sans font-bold '>
                {String(onedata) === "active"?(<div>
                    <div className='flex border  rounded-md border-gray-400 justify-center items-center gap-2'> 
                        <span className='text-green-400 2xl:text-xl'>
                            <TbDeviceDesktopUp/>
                        </span>
                        <span className='text-green-400 text-sm 2xl:text-xl'>
                            Active
                        </span>
                    </div>
                </div>):(
                    <div>
    
                    <div className='flex border  rounded-md border-gray-400 justify-center items-center gap-2'> 
                        <span className='text-red-400 2xl:text-xl'>
                            <TbDeviceDesktopX/>
                        </span>
                        <span className='text-red-400 text-sm 2xl:text-xl'>
                            InActive
                        </span>
                    </div>
                </div>
                )}
                <div
                    onClick={() => handleClick(1)}
                    className={`hover:cursor-pointer text-[10px] md:text-[15px] 2xl:text-xl ${NavBar == 1 ? 'text-yellow-400' : ''}`}
                    >
                    Home /
                    </div>
                    <div
                    onClick={() => handleClick(2)}
                    className={`hover:cursor-pointer text-[10px] md:text-[15px] 2xl:text-xl ${NavBar == 2 ? 'text-yellow-400' : ''}`}
                    >
                    Reports /
                    </div>
                    <div
                    onClick={() => handleClick(3)}
                    className={`hover:cursor-pointer text-[10px] md:text-[15px]  2xl:text-xl ${NavBar == 3 ? 'text-yellow-400' : ''}`}
                    >
                    Settings
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
