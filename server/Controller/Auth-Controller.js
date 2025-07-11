import  {User}  from "../Model/user-model.js"
import { generateToken } from "../utils/lib.js";
import bcrypt from "bcrypt"

export const signup =async (req,res)=>{
    console.log(req.body);
    
    const {userName, password, email} = req.body;
    try {

        if(!userName || !password || !email){
             return res.status(500).json({
                    message: "All fileds must be filled !"
                })
        }
        const existingUser = await User.findOne({email});

        if(existingUser){
             return res.status(400).send({message:"Email already exist"}); 
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await  bcrypt.hash(password,salt);

        const newUser = new User ({
            userName:userName,
            email:email,
            password: hashedPass
        })

        if(newUser){
           const savedUser = await newUser.save();
           res.status(200).json(savedUser)


        //    res.status(200).json({
        //        userName: newUser.userName,
        //        email:newUser.email,
        //        password: newUser.password,
   
        //    })
        }else{
            return res.status(500).json({
                message: "An error has Occured"
            })
        }

    } catch (error) {
         res.status(500).json({
            message:error.message
        })
        
    }   
    
}



export const login =async (req,res)=>{
    console.log(req.body);
    
         const {password, email} = req.body;
    try {

        if(!password || !email){
             return res.status(500).json({
                    message: "All fileds must be filled !"
                })
        }
        const user = await User.findOne({email});

        if(!user){
             return res.status(400).send({message:"Email does not exist"});
        }
        // console.log("here is the user", user);
        
        

        const hashedPass = await bcrypt.compare(password,user.password);

        if(!hashedPass){
            res.status(500).json({
                message:"Incorrect Password"
            })
        }

        generateToken(user._id,req,res);

        res.status(200).json({
            user:user,
            success:true,
            message:"Loged In Successful"
           
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }

}
export const logout =async (req,res)=>{
    
    try {
//         res.clearCookie("token").json({
//     success: true,
//     message: "Logged out successfully!",
//   });
      await res.cookie("jwt", "", {
        maxAge: 0,
        httponly:true,
        secure:false,
        sameSite: "strict",
    })
    res.status(200).json({
        message: "log out user"
    })

    } catch (error) {
         res.status(500).json({
            message:error.message
        })  
    }

}