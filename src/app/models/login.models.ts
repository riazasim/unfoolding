import { DeaUserRole } from "./roles.type";

export interface DeaLoginModel {
  email: string;
  password: string;
}

export interface DeaLoginResponseModel {
  user: string;
  role: DeaUserRole;
  user_info:any;
  token: string;
  firstName:any,
  lastName:any,
}
