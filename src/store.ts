import { create } from "zustand";

interface Tenant{
  id:number;
  name:string;
  address:string;
}

export interface User{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  role:string;
  tenant?:Tenant;
}

interface AuthState{
  user: null | User;
  setUser:(user:User)=>void;
  logout:()=>void;
}

export const userAuthStore=create<AuthState>((set)=>({

  user:null,
  setUser:(user:User)=>set({user}),
  logout:()=>set({user:null}),

}))