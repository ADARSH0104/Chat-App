import axios from 'axios';
import {create} from 'zustand';
export const axiosInstance=axios.create({
    baseURL:"http://loalhost:5001/api",
    withCredentials:true,
})

