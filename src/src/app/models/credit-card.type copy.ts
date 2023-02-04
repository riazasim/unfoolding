export type SpAccessCardProvider =
  'visa'
  | 'stripe'
  | 'paypal'
  | 'mastercard'
  | 'jcb'
  | 'discover'
  | 'amex';

export type SpAccessCreditCardType = 'primary' | 'backup';

export interface SpAccessCreditCard {
  type: SpAccessCreditCardType;
  provider: SpAccessCardProvider;
  expirationDate: number;
  shortNum: string;
}
