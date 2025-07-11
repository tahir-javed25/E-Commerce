import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../Model/user-model.js";

dotenv.config();


export const protectRoute = async (req,res,next)=>{
    try {
    const token = req.cookies.jwt;
    // console.log(token);
    const decode = jwt.verify(token, process.env.SECRETKEY);

    if(!decode){
        return res.status(500).json({
            message: "Porblem with the authentication"
        })
    }

    const verifyedUser = await User.findById(decode.userId).select("-password");
    // console.log(verifyedUser);
    

      if(!verifyedUser){
            return res.status(404).json({ message: 'User not found.' });
        }

    req.user = verifyedUser;
    

   return next();

        
    } catch (error) {
         console.log("error in protectRoute", error.message)
        return res.status(500).json({
            message:error.message
        })
        
    }
   
}