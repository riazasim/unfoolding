import * as faker from 'faker';
import { DeaInvoiceModel } from 'src/app/models/dea-invoice.model';
import { DeaProductModel } from 'src/app/models/dea-product.model';
import { MultipleEntityDataGenerator } from 'src/app/shared/utils/generators';

export function productFactory(product: Partial<DeaProductModel>): DeaProductModel {
  return {
    firstPartnerFee: faker.datatype.number({ min: 0 }),
    id: faker.datatype.number({ min: 1 }),
    name: faker.commerce.productName(),
    price: faker.datatype.number({ min: 10 }),
    secondPartnerFee: faker.datatype.number({ min: 0 }),
    type: faker.commerce.productAdjective(),
    ...product,
  };
}

export const multipleProductsFactory = MultipleEntityDataGenerator(productFactory);


export function invoiceFactory(invoice: Partial<DeaInvoiceModel>): DeaInvoiceModel {
  return {
    id: faker.datatype.number({ min: 0 }),
    customer: faker.company.companyName(),
    date: faker.date.past(1, new Date()).getTime(),
    owner: faker.company.companyName(),
    ownerAmount: faker.datatype.number({ min: 1 }),
    partnerAmount: faker.datatype.number({ min: 1 }),
    priceListAmount: faker.datatype.number({ min: 1 }),
    refId: faker.datatype.uuid().substr(0, 8),
    status: faker.random.arrayElement(['paid', 'not paid']),
    totalAmount: faker.datatype.number({ min: 1 }),
    ...invoice
  };
}

export const multipleInvoicesFactory = MultipleEntityDataGenerator(invoiceFactory);
