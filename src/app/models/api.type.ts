export interface DeaApiModel {
  root: string;
  namespaces: DeaApiNamespaces;
}

export class DeaApiNamespaces {
  user: string = "user";
  security: string = "security";
  dashboard: string = "dashboard";
  subUser: string = "subUser";
  subUserUsages: string = "subUserUsages";
  default: string = "";
  api: string = "api";
  apiAdmin: string = "api/admin";
  apiAuth: string = "api";
}
