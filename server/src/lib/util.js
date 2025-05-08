import jwt from "jsonwebtoken";

export const generateToken=(id,res)=>{
    const token= jwt.sign({id},process.env.JWT_SECRETKEY,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,//MS
        httpOnly:true,//prevent XSS attack cross-site scripting attack
        sameSite:"strict",//CSRF attacks cross site req forgery attacks
        secure:process.env.NODE_ENV!=="development",
    });
    return token;
}