import { CreateUserData, Credentials,CreateTenantData  } from "../types";
import { api } from "./client";



export const AUTH_SERVICE='/api/auth';
const CATALOG_SERVICE='/api/catalog';
//Auth service
export const login= (credentials:Credentials)=>api.post(`${AUTH_SERVICE}/auth/login`,credentials);

export const self=()=>api.get(`${AUTH_SERVICE}/auth/self/`);

export const logout=()=>api.post(`${AUTH_SERVICE}/auth/logout`);

export const getUsers=(queryString:string)=>api.get(`${AUTH_SERVICE}/users?${queryString}`);

export const getTenants=(queryString:string)=>api.get(`${AUTH_SERVICE}/tenants?${queryString}`);

export const getTenantsDropdown=()=>api.get(`${AUTH_SERVICE}/tenants/dropdown`);

export const createUser=(user:CreateUserData)=>api.post('${AUTH_SERVICE}/users',user);

export const createTenant=(tenantData:CreateTenantData)=>api.post('${AUTH_SERVICE}/tenants',tenantData);

export const updateUser=(user:CreateUserData,id:string)=>api.patch(`${AUTH_SERVICE}/users/${id}`,user);

export const updateTenant=(tenantData:CreateTenantData,id:number)=>api.patch(`${AUTH_SERVICE}/tenants/${id}`,tenantData);


//CATALOG_SERVICE
export const getCategories=()=>api.get(`${CATALOG_SERVICE}/categories`);

export const getProducts=(queryParams:string)=>api.get(`${CATALOG_SERVICE}/products?${queryParams}`);

export const createProduct=(product:FormData)=>api.post(`${CATALOG_SERVICE}/products`,product,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});