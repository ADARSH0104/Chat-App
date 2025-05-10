import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:false,
    onlineUser:[],


    checkAuth:async()=>{
        try {
            const  res=axiosInstance.get("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in check Auth",error.message);
            set({authUser:null});
        }finally{
            set({checkAuth:false});
        }
    }
}))