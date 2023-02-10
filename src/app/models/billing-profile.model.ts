export interface BillingProfileModel {
  id: string;
  paymentAccountNickname?: string;
  name: string;
  address: string;
  accountType: string;
  vatNumber: number;
  country: string;
  registrationNumber: string;
}
