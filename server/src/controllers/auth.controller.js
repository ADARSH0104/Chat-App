import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/util.js"

export const signup=async (req,res)=>{
    const {fullName,email,password}=req.body;
   try {
        if(!fullName||!password||!email){
           return res.status(400).json({message:"All fields are required"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const user=await User.findOne({email});
        if(user){
            return  res.status(400).json({message:"Email already exists"});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).
            json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilepic:newUser.profilepic,
            });
        }else{
             res.status(400).json({message:"Invalid user data"});
        }
   } catch (error) {
        console.log("server error",error.message);
        res.status(500).json({message:"Internal server error"});
   }
}
export const login=async(req,res)=>{
   try {
    const {email,password} =req.body;

    if(!password||!email){
        return res.status(400).json({message:"All fields are required"});
     }
     const user=await User.findOne({email});
     if(!user){
        return res.status(400).json({message:"Invalid credentials!"})
     }
     const isPasswordCorrect=await bcrypt.compare(password,user.password);
     if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials!"})
     }
     generateToken(user._id,res);
    
     res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilepic:user.profilepic,
    });
    } catch (error) {
    console.log("Login controller error",error.message);
    res.status(500).json({message:"Internal server error"});
    }
}
export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout Successful"});
    } catch (error) {
        
    }
}
export const updateProfile=async(req,res)=>{
 try {
    const {profilepic} = req.body;
    if(!profilepic) return res.status(400).json({message:"Profile pic is required"});
   const updateResponse=await cloudinary.uploader.upload(profilepic)
   const updateUser=await User.findByIdAndUpdate(req.user._id,{profilrpic:updateResponse.secure_url},{new:true});
   res.status(200).json(updateUser);
 } catch (error) {
    console.log("Profile update error",error.message)
    res.status(500).json({message:"Internal server error"});
 }
}

export const checkAuth=(req,res)=>{
try {
    res.status(200).json(req.user);
} catch (error) {
    console.log("check Auth controller error",error.message);
    res.status(500).json({message:"Internal server error"});
}
}