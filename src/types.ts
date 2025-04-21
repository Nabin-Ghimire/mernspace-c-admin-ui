export type Credentials={
  email: string;
  password: string;
}

export type User={
  id: string;
  email:string;
  firstName:string;
  lastName:string;
  role:string;
  createdAt:string;

}

export type CreateUserData={
  id: string;
  email:string;
  firstName:string;
  lastName:string;
  role:string;
  tenantId:number;
}

export type Tenant={
id:number;
name:string;
address:string;
}