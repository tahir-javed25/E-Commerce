import { Router } from "express";

import {login, signup, logout} from "../Controller/Auth-Controller.js"
import { protectRoute } from "../middleware/auth-middleware.js";


const router = Router();

// register
router.post("/signup",  signup)

// Login
router.post("/login",login)

// Log Out
router.post("/logout",logout)

// Auth MiddleWare, 
router.get("/check-auth",protectRoute, 
  (req,res)=>{
    const user = req.user;

    // console.log("user found",user);
    res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });

  
}
)




export const authRouter = router;