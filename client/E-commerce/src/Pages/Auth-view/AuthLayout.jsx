import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex flex-row border-4 border-blue-200  w-[100vw] min-h-screen'>
        <div className='flex flex-col gap-5 items-center justify-center bg-black text-white w-1/4 '>
            Welcome to  the E-Commerce Store
            <div className='grid grid-cols-3 grid-rows-3'>
            {new Array(9).fill(null).map((item,index)=>{
                return( <div key={index} className={`aspect-square border border-black bg-blue-300 h-20 w-20  ${
                  index % 2 === 0 ? "animate-pulse" : ""
                }`}></div> )
            })}
          </div>
        </div>
        <div className='flex justify-center items-center  w-3/4'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default AuthLayout
