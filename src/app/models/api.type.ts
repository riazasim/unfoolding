export interface DeaApiModel {
  root: string;
  namespaces: DeaApiNamespaces;
}

export interface DeaApiNamespaces {
  user: string;
  security: string;
  dashboard: string;
  subUser: string;
  subUserUsages: string;
  default: string;
}
