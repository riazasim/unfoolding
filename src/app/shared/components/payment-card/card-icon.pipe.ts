import { Pipe, PipeTransform } from '@angular/core';
import { CardProvider } from 'src/app/models/credit-card.type';

const cardsMap: Readonly<{ [key in Partial<CardProvider>]: string }> = Object.freeze({
  visa: 'https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png',
  amex: 'https://logos-world.net/wp-content/uploads/2020/11/American-Express-Logo.png',
  jcb: 'https://w7.pngwing.com/pngs/157/1005/png-transparent-ucb-logo-jcb-co-ltd-logo-payment-credit-card-card-vetor-text-service-business.png',
  discover: 'https://1000logos.net/wp-content/uploads/2021/05/Discover-logo.png',
  mastercard: 'https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png',
  paypal: 'https://logos-world.net/wp-content/uploads/2020/05/PayPal-Logo.png',
  stripe: 'https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png'
});


@Pipe({
  name: 'cardIcon'
})
export class CardIconPipe implements PipeTransform {

  transform(value: CardProvider | string): string {
    return cardsMap[value as CardProvider] ?? '';
  }

}
