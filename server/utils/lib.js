import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const generateToken = async (userId,req, res) => {

    const token = jwt.sign({userId}, process.env.SECRETKEY,{expiresIn:"7d"})   //SECRETEKEY
    // console.log(token);

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httponly:true,
        secure:false,
        sameSite: "strict",
    })
    // console.log("Cookie Set:", req.cookies);

    return token;
}