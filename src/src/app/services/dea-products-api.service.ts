import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { DeaProductModel } from '../models/dea-product.model';
import { GenericApiService } from './generic-api.service';
import { multipleProductsFactory, productFactory } from './testing/factories';

@Injectable({
  providedIn: 'root'
})
export class DeaProductsApiService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  public requestList(): Observable<DeaProductModel[]> {
    return of(multipleProductsFactory(100, {}));
  }

  public getOne(id: number): Observable<DeaProductModel> {
    return of(productFactory({ id }));
  }

  public deleteOne(id: number | string): Observable<void> {
    return of();
  }

  public addOne(data: Omit<DeaProductModel, 'id'>): Observable<DeaProductModel> {
    return of(productFactory({ ...data }));
  }

  public updateOne(data: Omit<DeaProductModel, 'id'>, id: number): Observable<DeaProductModel> {
    return of({ ...data, id });
  }
}
