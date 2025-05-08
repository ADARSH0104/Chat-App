import express from "express";
import dotenv from "dotenv"
import {connectDB} from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
const app=express();

dotenv.config();

//used to extract json data
app.use(express.json());
app.use(cookieParser());

const PORT=process.env.PORT;
app.use("/api/auth",authRoutes);

app.listen(PORT,()=>{
    console.log("Server running on Port: "+PORT);
    connectDB();
})