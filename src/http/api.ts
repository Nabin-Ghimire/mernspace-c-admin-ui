import { CreateUserData, Credentials,CreateTenantData  } from "../types";
import { api } from "./client";




//Auth service
export const login= (credentials:Credentials)=>api.post('/auth/login',credentials);

export const self=()=>api.get('auth/self/');

export const logout=()=>api.post('/auth/logout');

export const getUsers=(queryString:string)=>api.get(`/users?${queryString}`);

export const getTenants=(queryString:string)=>api.get(`/tenants?${queryString}`);

export const createUser=(user:CreateUserData)=>api.post('/users',user);

export const createTenant=(tenantData:CreateTenantData)=>api.post('/tenants',tenantData);

export const updateUser=(user:CreateUserData,id:string)=>api.patch(`/users/${id}`,user);