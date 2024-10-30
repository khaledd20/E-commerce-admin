export interface User {
  id: string;
street: string;
phoneNumber: string;
  name: string;
  email: string;
  mobileNo: string[];
  username:string;
  roles:string[]
  address: {
    street: string;
    postalCode: string;
    city:string
  };
  Delivery:Date;
  password:string
}
