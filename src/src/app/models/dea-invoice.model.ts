export interface DeaInvoiceModel {
  id: number;
  owner: string;
  customer: string;
  refId: string;
  date: number;
  priceListAmount: number;
  totalAmount: number;
  partnerAmount: number;
  ownerAmount: number;
  status: 'paid' | 'not paid';
}
