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
  tenant:Tenant |null;

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

export type CreateTenantData={
  name:string;
  address:string;
}

export type FieldData={
  name:string[];
  value?:string;
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

export interface Category {
    _id:string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}


export type Product={
  _id:string;
  name:string;
  description:string;
  categoryId:Category;
  image:string,
  isPublish:boolean;
  createdAt:string; 
}

export type ImageField={file:File}

export type CreateProductData=Product&{
  image:ImageField
}