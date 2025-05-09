import Message from "../models/message.model.js"

export const getSideBar=async(req,res)=>{
    try {
        const loggedinUserId =req.user._id

    const filteredUser= await Message.findById({_id:{$ne:loggedinUserId}}).select("-password");

} catch (error) {
        console.log("getSideBar controller error",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}