import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from 'cors';
import cookieParser from "cookie-parser";
const app=express();

dotenv.config();

//used to extract json data
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,

}
))
const PORT=process.env.PORT;
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


app.listen(PORT,()=>{
    console.log("Server running on Port: "+PORT);
    connectDB();
})