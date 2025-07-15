import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId :String,
    cartId : String,
     cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: Number,
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
  orderStatus: {type: String, enum: ["initiated", "pending", "processing", "completed","cancel"], default:"initiated"},
  paymentMethod:{ type: String, enum:["COD", "ONLINE"], default :"COD"},
  totalAmount: Number,
  orderDate: Date,
});



export const Order = mongoose.model("order", OrderSchema)