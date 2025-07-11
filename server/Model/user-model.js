import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        userName : {type:String, required:true},
        email : {type:String, required:true},
        password : {type:String, required:true},
        role: {type:String, default: "user"},
        imageUrl : {type:String,  default:""},
        imageId : {type:String,  default:""},
},{timestamps:true})


export const User = mongoose.model("User", userSchema); 