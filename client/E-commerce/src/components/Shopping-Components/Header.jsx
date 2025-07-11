import { HomeIcon, LogOut, Menu, ShoppingCart, ShoppingCartIcon, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/Auth-Slice/authSlice'
import UserCartWrapper from './Cart-wrapper'
import { fetchCartItems } from '@/store/Shop/Cart-Slice'

const Header = () => {
  
  return (
   <>
   <header className="sticky bg-white top-0  z-40 mx-2 my-2">
   <div className='flex justify-between items-center  border' > 
    <Link to="/shop/home" className='flex items-center'>
    <HomeIcon className='h-6 w-6 max-lg:hidden '  />
    <span className='text-2xl font-extrabold'>E-Commerce</span>
    </Link>
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white text-black lg:hidden" >
          <Menu className='h-6 w-6 '/>
          <span className='sr-only'>Header Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='flex flex-col gap-4'><MenuItems/></div>
        <div><HeaderRightSide/></div>
      </SheetContent>
    </Sheet>

    <div className=' w-[50vw] hidden lg:block' > 
      <MenuItems/> 
    </div>

    <div className='flex justify-between items-center max-lg:hidden' > 
        <HeaderRightSide/> 
    </div>

   </div>
   
   </header>
   </>
  )
}

export default Header



const MenuItems = () => {
  return (
    <>
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map((menuItem)=> {
        return(
          <NavLink to={menuItem.path} key={menuItem.id}
          className="text-sm font-medium cursor-pointer max-lg:hover:bg-muted-foreground p-2 rounded-lg hover:underline"
          > 
          {menuItem.label}
           </NavLink>
        )
      })
    }
    </nav>
    </>
    
   
  )}


const HeaderRightSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state)=>state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);

 const handleLogout = () =>{
  dispatch(logoutUser());
  navigate("/auth/login")
  
 }


useEffect(()=>{
  dispatch(fetchCartItems(user?._id));
},[dispatch])
    
  return (
    <div className='flex flex-col lg:flex-row w-[5vw] justify-between gap-6 items-center' >
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      

       <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


