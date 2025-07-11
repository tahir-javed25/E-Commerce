import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/Auth-Slice/authSlice'

const Header = ({setOpen}) => {
  const dispatch = useDispatch();

  

  const handleLogout =()=>{
    dispatch(logoutUser());
  }

  return (
   <header className='flex items-center justify-between bg-background border-b px-4 py-3 '>
    <Button onClick={()=>{setOpen(true)}} className="text-black  items-center bg-white lg:hidden md:flex">
      <AlignJustify />
      <span>Toggle Menu</span>
    </Button>
    <div className='flex flex-1 justify-end ' onClick={handleLogout}>
      <Button  className="inline-flex gap-2 items-center rounded-md py-4 px-2 text-sm shadow font-medium "> 
        <LogOut/>
        <span>LogOut</span>
      </Button>
    </div>

   </header>
  )
}

export default Header
