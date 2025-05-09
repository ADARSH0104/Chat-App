import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute=async(req,res,next)=>{
try {
    const token=req.cookies.jwt;
    
    if(!token){
        return res.status(401).json({message:"Unauthorized- No token priovided"});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRETKEY);
    if(!decoded){
        return res.status(401).json({message:"Unauthorized- Invalid token"})
    }
    const user= await User.findById(decoded._id).select("-password");
    if(!user) return res.status(400).json({message:"User not found"});

    req.user=user;

    next(); 
} catch (error) {
    console.log("Error in protected route",error.message);
    res.status(500).json("Internal error");
}
   
}