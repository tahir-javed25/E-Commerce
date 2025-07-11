import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  image: {type:String, require:true},
  title:  {type:String, require:true},
  description:  {type:String, require:true},
  category:  {type:String, require:true},
  brand:  {type:String, require:true},
  price:  {type:Number, require:true},
  salePrice:  {type:Number,require:true},
  totalStock:  {type:Number, require:true},
  averageReview:  {type:Number, require:true},
},{timestamps:true})



export const Products = mongoose.model("Product",productsSchema)