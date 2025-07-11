import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId :String,
    cartId : String,
     cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  totalAmount: Number,
  orderDate: Date,
});



export const Order = mongoose.model("order", OrderSchema)