import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js"
import {getSideBar} from "../controllers/message.controller.js"
const router=express.Router();

router.get("/users",protectRoute,getSideBar)

export default router;