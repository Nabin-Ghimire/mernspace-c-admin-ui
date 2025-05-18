import axios from "axios";
import { userAuthStore } from "../store";
import { AUTH_SERVICE } from "./api";
export const api=axios.create(
  {
    baseURL:import.meta.env.VITE_BACKEND_API_URL,
    withCredentials:true, //allow cookies to be sent with requests if we don't write it here, it will not be send cookies with requests
    headers:{
      'Content-Type':'application/json',
      Accept:'application/json',
    }

  });

const refreshToken=async()=>{
return await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}${AUTH_SERVICE}/auth/refresh`,{},{withCredentials:true,});

};
//Due to post request we need to pass the empty object as data in the request body,
//To avoid circular dependency, we are not importing the refresh token function here

api.interceptors.response.use((response)=>response,async (error)=>{
  const originalRequest=error.config;

  if(error.response?.status===401 && !originalRequest._isRetry){
    try {
      originalRequest._isRetry=true;
      const headers={
        ...originalRequest.headers,};
      await refreshToken();
      return api.request({...originalRequest,headers});
    } catch (err) {
      console.error("Token refresh error",err);
      //logout or redirect to login page
      //window.location.href="http://clientui/login" OR,
      userAuthStore.getState().logout();
      return Promise.reject(err);

    }
  }

  return Promise.reject(error);
})