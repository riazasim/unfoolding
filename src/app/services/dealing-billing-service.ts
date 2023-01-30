import { Injectable, Injector } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { BillingProfileModel } from '../models/billing-profile.model';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeabillingApiService {
    apiClient: any;
    billingAPIObs = new Subject();
    billingDataObs = new Subject();
  constructor(private injector: Injector) {
    this.apiClient = this.injector.get(GenericApiService<DeaApiNamespaces>)

  }

  /**
   * For now those endpoints will use the default namespace
   */
  public requestList(): Observable<BillingProfileModel[]> {
    return this.apiClient.getArray('api', 'admin/billing-profiles');
  }

//   public getOne(id: number | string): Observable<BillingProfileModel> {
//     return this.apiClient.getOne('default', `sub-users/${id}`);
//   }

  public deleteOne(id: number | string): Observable<void> {
    return this.apiClient.delete('api', `admin/billing-profiles/${id}`);
  }

  public addOne(data: BillingProfileModel): Observable<BillingProfileModel> {
    return this.apiClient.postJSONWrappedData('apiAdmin', 'billing-profiles', data)
    .pipe(
      pluckItemWrapperData()
    );
  }

  public updateOne(data: Omit<BillingProfileModel, 'id'>, id: string | number): Observable<BillingProfileModel> {
    return this.apiClient
      .putJSONWrappedData('api', `billing-profiles/${id}`, data)
      .pipe(
        pluckItemWrapperData()
      );
  }
  public uploadExcelFile(file: File): Observable<unknown> {
    return this.apiClient.postFormData('default', 'sub-users/import-csv', { 'importCSV': file }, '');
  }

}
