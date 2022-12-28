import { DeaUserRole } from "./roles.type";

export interface DeaLoginModel {
  email: string;
  password: string;
}

export interface DeaLoginResponseModel {
  user: string;
  role: DeaUserRole;
  token: string;
}
