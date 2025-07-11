import React from 'react'
import UserCartItemsContent from './Cart-content'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'


const UserCartWrapper = ({setOpenCartSheet, cartItems}) => {
  const navigate = useNavigate();
  const totalCartAmount = cartItems && cartItems.length > 0 
  ? cartItems.reduce((sum, item) => sum + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity, 0)
  : 0;

  // console.log(cartItems)
    
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item,index) => <UserCartItemsContent cartItem={item} key={index} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  )
}

export default UserCartWrapper
