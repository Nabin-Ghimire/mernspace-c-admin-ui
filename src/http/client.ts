import axios from "axios";

export const api=axios.create(
  {
    baseURL:import.meta.env.VITE_BACKEND_API_URL,
    withCredentials:true, //allow cookies to be sent with requests if we don't write it here, it will not be send cookies with requests
    headers:{
      'Content-Type':'application/json',
      Accept:'application/json',
    }

  }
);