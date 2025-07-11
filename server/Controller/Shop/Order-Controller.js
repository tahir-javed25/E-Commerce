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
            message: "Can't Place your Order!"
        })
        
    }

       
}
export const confirmOrder =(req,res)=>{

}
export const getAllOrdersByUser =(req,res)=>{

}
export const getOrderDetails =(req,res)=>{

}