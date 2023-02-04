export interface BillingProfileModel {
  paymentAccountId: string;
  paymentAccountNickname?: string;
  name: string;
  address: string;
  accountType: string;
  vatNum: number;
  country: string;
  registrationNum: string;
}
