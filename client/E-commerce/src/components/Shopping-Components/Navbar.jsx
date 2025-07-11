import { AlignJustify, ListOrderedIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/Auth-Slice/authSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogout =async ()=>{
    
    dispatch(logoutUser());
    navigate("/auth/login")
    console.log("logging out");
    

  }



  return (
    <nav className='flex flex-row justify-between p-2 border-t-8 bg-white w-[80%]'>
        <div className='flex flex-row justify-between w-[50%]  text-sm'>
            <NavLink className=" flex flex-row font-bold"><AlignJustify/>All Category</NavLink>
            <NavLink className=" flex flex-row font-bold">Hot Offers</NavLink>
            <NavLink className=" flex flex-row font-bold">Gift Box</NavLink>
            <NavLink className=" flex flex-row font-bold">Menu Items</NavLink>
            <NavLink className=" flex flex-row font-bold">Projects</NavLink>
            <NavLink className=" flex flex-row font-bold">Help</NavLink>
            
                
               
        </div>
        <div>
            <Button onClick ={handelLogout} >LogOut</Button>

        </div>
    </nav>
  )
}

export default Navbar
