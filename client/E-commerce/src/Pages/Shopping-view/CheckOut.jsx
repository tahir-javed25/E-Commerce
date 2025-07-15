import Address from "@/components/Shopping-Components/Address";
import UserCartItemsContent from "@/components/Shopping-Components/Cart-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { confirmOrder, createNewOrder } from "@/store/Shop/Order-Slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CheckOut = () => {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setcurrentSelectedAddress] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const {toast} = useToast();
  

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice > 0 ? item?.salePrice : item?.price) *
              item?.quantity,
          0
        )
      : 0;

      const handleInitialOrder =()=>{
        if(cartItems.length === 0 ){
          toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return
        }

        if(currentSelectedAddress === null){
          toast({
            title: "Please give atleast one Address",
            variant:"distructive",
          })
          return
        }

        const orderData = {
          userId : user?._id,
          cartId : cartItems?._id,
          cartItems : cartItems.items.map((singleItem)=>({
            productId : singleItem?.productId,
            tiltle : singleItem?.title,
            image: singleItem?.image,
            price:
               singleItem?.salePrice > 0
               ? singleItem?.salePrice
                : singleItem?.price,
           quantity: singleItem?.quantity,
          })),

        addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "initiated",
      paymentMethod: "COD",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
     
    };

     dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setOrderId(data?.payload?.orderId)
        
      } 
    });

      }

      const confirmCheckout =(orderId)=>{
        console.log(user?._id);
        const userId = user?._id;
        
        dispatch(confirmOrder({orderId,userId})
      ).then((data) => {
          console.log(data?.payload);
          
      if (data?.payload?.success) {
         toast({
            title: "Order Confirmed",
          })
      } 
    });

      }

      const actionCheckout = ()=>{
        if (orderId) {
          confirmCheckout(orderId)
        }else{
          handleInitialOrder()
        }
      }

      // console.log(cartItems);
      

  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      <section>
        <Address 
        selectedAddress = {currentSelectedAddress}
        setSelectedAddress = {setcurrentSelectedAddress}
        />
      </section>
      <section className="border rounded-lg p-1">
        {cartItems && cartItems.items && cartItems.items.length > 0
          ? cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item}  key={item.productId} />
            ))
          : null}

        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button onClick={actionCheckout} className="w-full">
           {orderId ? "Confirm Order" : "Checkout"}
            </Button>
        </div>
      </section>
    </div>
  );
};

export default CheckOut;




