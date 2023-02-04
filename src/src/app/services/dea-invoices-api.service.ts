import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { DeaInvoiceModel } from '../models/dea-invoice.model';
import { GenericApiService } from './generic-api.service';
import { invoiceFactory, multipleInvoicesFactory } from './testing/factories';


@Injectable({
  providedIn: 'root'
})
export class DeaInvoicesApiService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  public requestList(): Observable<DeaInvoiceModel[]> {
    return of(multipleInvoicesFactory(100, {}));
  }

  public getOne(id: number): Observable<DeaInvoiceModel> {
    return of(invoiceFactory({ id }));
  }

  public deleteOne(id: number | string): Observable<void> {
    return of();
  }

  public addOne(data: Omit<DeaInvoiceModel, 'id'>): Observable<DeaInvoiceModel> {
    return of(invoiceFactory({ ...data }));
  }

  public updateOne(data: Omit<DeaInvoiceModel, 'id'>, id: number): Observable<DeaInvoiceModel> {
    return of({ ...data, id });
  }
}
