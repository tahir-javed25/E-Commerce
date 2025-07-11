import { useToast } from '@/hooks/use-toast';
import { deleteCartItem, fetchCartItems, updateCartQuantity } from '@/store/Shop/Cart-Slice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { Minus, Plus, Trash } from 'lucide-react';

const UserCartItemsContent = ({cartItem}) => {
  const { user } = useSelector((state) => state.auth);
  // const { cartItems } = useSelector((state) => state.shopCart);
  // const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const {toast} = useToast();

const handleUpdateQuantity =(getCartItem, typeOfAction)=>{

  dispatch(updateCartQuantity({
    userId: user?._id,
    productId: getCartItem?.productId,
    quantity:
      typeOfAction === "plus"
        ? getCartItem?.quantity + 1
        : getCartItem?.quantity - 1,
  }))
  .then((data) => {
    if (data?.payload?.success) {
      toast({
        title: "Cart updated",
      });
    }
  })


}

const handleCartItemDelete =(getCartItem)=>{
  dispatch(
      deleteCartItem({ userId: user?._id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
}

  return (
    <div className="flex items-center space-x-4 mb-3">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20} 
        />
      </div>
    </div>
  )
}

export default UserCartItemsContent
