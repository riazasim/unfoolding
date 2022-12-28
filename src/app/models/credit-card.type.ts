export type CardProvider =
  'visa'
  | 'stripe'
  | 'paypal'
  | 'mastercard'
  | 'jcb'
  | 'discover'
  | 'amex';

export type CreditCardType = 'primary' | 'backup';

export interface CreditCard {
  type: CreditCardType;
  provider: CardProvider;
  expirationDate: number;
  shortNum: string;
}
