import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeaApiNamespaces } from '../models/api.type';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { DeaSubUserModel } from '../models/user.model';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaSubUserApiService {

  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>) {
  }

  /**
   * For now those endpoints will use the default namespace
   */
  public requestList(): Observable<DeaSubUserModel[]> {
    return this.apiClient.getArray<DeaSubUserModel>('default', 'sub-users');
  }

  public getOne(id: number | string): Observable<DeaSubUserModel> {
    return this.apiClient.getOne('default', `sub-users/${id}`);
  }

  public deleteOne(id: number | string): Observable<void> {
    return this.apiClient.delete('default', `sub-users/${id}`);
  }

  public addOne(data: Omit<DeaSubUserModel, 'id'>): Observable<DeaSubUserModel> {
    return this.apiClient
      .postJSONWrappedData<Omit<DeaSubUserModel, 'id'>, ResponseItemWrapper<DeaSubUserModel>>('default', 'sub-users', data)
      .pipe(
        pluckItemWrapperData<DeaSubUserModel, ResponseItemWrapper<DeaSubUserModel>>()
      );
  }

  public updateOne(data: Omit<DeaSubUserModel, 'id'>, id: string | number): Observable<DeaSubUserModel> {
    return this.apiClient
      .putJSONWrappedData<ResponseItemWrapper<DeaSubUserModel>>('default', `sub-users/${id}`, data)
      .pipe(
        pluckItemWrapperData<DeaSubUserModel, ResponseItemWrapper<DeaSubUserModel>>()
      );
  }

  public uploadExcelFile(file: File): Observable<unknown> {
    return this.apiClient.postFormData('default', 'sub-users/import-csv', { 'importCSV': file }, '');
  }

}
