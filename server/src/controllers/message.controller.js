import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
export const getSideBar=async(req,res)=>{
    try {
        const loggedinUserId =req.user._id

    const filteredUser= await Message.findById({_id:{$ne:loggedinUserId}}).select("-password");
        res.status(200).json(filteredUser)
} catch (error) {
        console.log("getSideBar controller error",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:receiverId} =req.params;
        const senderId=req.user._id;

        const messages= await Message.find({$or:
                                    [{senderId:senderId,receiverId:receiverId},
                                    {senderId:receiverId,receiverId:senderId}]});
        res.status(200).json(messages);
    } catch (error) {
        console.log("getMessage controller error",error.message);
        res.status(500).json({error:"Internal server error"});
    } 
}

export const sendMessage=async(req,res)=>{
    const {text,image} =req.body
    const {id:receiverId}=req.params;
    const senderId=req.user._id;

    let imageURL;
    if(image){
        const uploadResponse=cloudinary.uploader.upload(image)
        imageURL=uploadResponse.secure_url;
    }
    const newMessage= new Message({
        senderId,
        receiverId,
        text,
        image:imageURL
    })
    await newMessage.save();

    //todo realtime message
}