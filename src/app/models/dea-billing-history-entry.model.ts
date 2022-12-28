export interface DeaBillingHistoryEntryModel {
  profile: string;
  document: string;
  refId: string;
  date: number;
  amount: number;
  status: 'paid' | 'unpaid';
}
