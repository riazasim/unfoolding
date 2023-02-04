import * as faker from 'faker';
import { CardProvider, CreditCard, CreditCardType } from 'src/app/models/credit-card.type';
import { MultipleEntityDataGenerator } from './generators';

export function creditCardGenerator(): CreditCard;
export function creditCardGenerator(type: CreditCardType): CreditCard;
export function creditCardGenerator(type: CreditCardType, provider: CardProvider): CreditCard;
export function creditCardGenerator(type: CreditCardType, provider: CardProvider, expirationDate: number): CreditCard;
export function creditCardGenerator(type: CreditCardType, provider: CardProvider, expirationDate: number, shortNum: string): CreditCard;

export function creditCardGenerator(type?: CreditCardType, provider?: CardProvider, expirationDate?: number, shortNum?: string): CreditCard {
  return {
    expirationDate: expirationDate ?? faker.date.between(new Date(1970, 0), new Date(2050, 0)).getTime(),
    provider: provider ?? faker.random.arrayElement(['visa', 'stripe', 'paypal', 'mastercard', 'jcb', 'discover', 'amex']),
    shortNum: shortNum ?? faker.datatype.number({ min: 0, max: 9999 }).toString().padStart(4, '0'),
    type: type ?? faker.random.arrayElement(['primary', 'backup'])
  };
}

export const multipleCreditCardGenerator = MultipleEntityDataGenerator(creditCardGenerator);
