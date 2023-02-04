import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { DeaCustomerModel } from '../models/dea-customer.model';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';


@Injectable({
  providedIn: 'root'
})
export class DeaCustomersApiService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  public requestList(): Observable<DeaCustomerModel[]> {
    return this.apiClient.getArray<DeaCustomerModel>('default', 'admin/customers')
      .pipe(
        tap(console.log)
      );
  }


  public getOne(id: DeaCustomerModel['id']): Observable<DeaCustomerModel> {
    return this.apiClient.getOne('default', `admin/customers/${id}`);
  }

  public deleteOne(id: DeaCustomerModel['id']): Observable<void> {
    return this.apiClient.delete('default', `admin/customers/${id}`);
  }

  public addOne(data: Omit<DeaCustomerModel, 'id' | 'email' | 'licenseId'>): Observable<DeaCustomerModel> {
    return this.apiClient
      .postJSONWrappedData<Omit<DeaCustomerModel, 'id' | 'email' | 'licenseId'>, ResponseItemWrapper<DeaCustomerModel>>
      ('default', 'admin/customers', data)
      .pipe(
        pluckItemWrapperData<DeaCustomerModel, ResponseItemWrapper<DeaCustomerModel>>()
      );
  }

  public updateOne(data: Omit<DeaCustomerModel, 'id' | 'email' | 'licenseId'>, id: DeaCustomerModel['id']): Observable<DeaCustomerModel> {
    return this.apiClient
      .putJSONWrappedData<ResponseItemWrapper<DeaCustomerModel>>('default', `admin/customers/${id}`, data)
      .pipe(
        pluckItemWrapperData<DeaCustomerModel, ResponseItemWrapper<DeaCustomerModel>>()
      );
  }


}
