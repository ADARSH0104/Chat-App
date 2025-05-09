import axios from 'axios';

export const axiosInstance=axios.create({
    baseURL:"http://loalhost:5001/api",
    withCredentials:true,
})