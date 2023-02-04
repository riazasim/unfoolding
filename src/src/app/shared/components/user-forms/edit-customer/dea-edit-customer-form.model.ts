import { DeaCustomerModel } from "src/app/models/dea-customer.model";

export type DeaEditCustomerFormModel =
  Omit<DeaCustomerModel, 'id'  | 'licenseId' | 'signUpDate'>
  & { signUpDate: string };

export type DeaEditCustomerOutputModel = Omit<DeaCustomerModel, 'id'  | 'licenseId'>;
