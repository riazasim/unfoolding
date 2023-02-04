export interface BillingHistoryEntryModel {
  profile?: string;
  document?: string;
  licenceSerialNumber: string;
  refId: string;
  date: number;
  amount: number;
  balance: string;
  status: 'paid' | 'unpaid';
}
