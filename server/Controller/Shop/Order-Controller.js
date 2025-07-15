import { Cart } from "../../Model/Cart.js";
import { Order } from "../../Model/Order.js";

export const createOrder =async (req,res)=>{

     const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      totalAmount,
      orderDate,
     
    } = req.body;

    try {
         const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          totalAmount,
          orderDate,
        });

        await newlyCreatedOrder.save();

        res.status(200).json({
            success:true,
            orderId: newlyCreatedOrder._id,
        })
        
    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Can't Place your Order, Please try again!"
        })
        
    }     
}


export const confirmOrder = async (req,res)=>{
    console.log(req.params);
        
    
    try {
        
       
        
        const {orderId,userId} = req.params;

        const orderInfo = await Order.findOne({_id: orderId, userId:userId, orderStatus:"initiated"})

        if(!orderInfo){
           return res.status(400).json({
                msg: "Order not found"
            })
        }

        const cartInfo = await Cart.findOne({userId: userId})

        if(!cartInfo){
            return res.status(400).json({
                msg: "No Product is FOund in Cart"
            })
        }

        await Order.findOneAndUpdate({_id: orderId}, {orderStatus: "pending"});

        await Cart.findOneAndDelete({userId: userId})

        return res.status(200).json({
            success:true,
            msg:"Order Confirmed"
        })
        
    } catch (error) {
         res.status(500).json({
            success: false,
            message: "Can't Confirm your Order, Please Try again!"
        })
        
    }

}

export const getAllOrdersByUser =(req,res)=>{

}
export const getOrderDetails =(req,res)=>{

}