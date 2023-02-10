import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeaApiNamespaces } from '../models/api.type';
import { ResponseItemWrapper } from '../models/response-wrappers.types';
import { DeaSubUserModel } from '../models/user.model';
import { pluckItemWrapperData } from '../shared/utils/api.functions';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaSubUserApiService {
  private API_URL = environment.API_URL;
  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>,
    private readonly httpClient: HttpClient) {
  }

  /**
   * For now those endpoints will use the default namespace
   */
  public requestList(): Observable<DeaSubUserModel[]> {
    return this.apiClient.getArray<DeaSubUserModel>('default', 'sub-users');
  }

  public getUserList(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + 'api/sub-users/' + id);
  }
  public deleteUser(id: number | string): Observable<any> {
    return this.httpClient.delete<any>(this.API_URL + 'api/sub-users/' + id);
  }

  public getOne(id: number | string): Observable<DeaSubUserModel> {
    return this.apiClient.getOne('default', `sub-users/${id}`);
  }

  public deleteOne(id: number | string): Observable<void> {
    return this.apiClient.delete('default', `sub-users/${id}`);
  }

  public addOne(data: Omit<DeaSubUserModel, 'id'>, id: string | number): Observable<DeaSubUserModel> {
    return this.apiClient
      .postJSONWrappedData<Omit<DeaSubUserModel, 'id'>, ResponseItemWrapper<DeaSubUserModel>>('api', `sub-users/${id}`, data)
      .pipe(
        pluckItemWrapperData<DeaSubUserModel, ResponseItemWrapper<DeaSubUserModel>>()
      );
  }
  public addUser(payload, id): Observable<any> {
    return this.httpClient.post(this.API_URL + `api/sub-users/${id}`, payload);
  }
  public updateUser(payload, id): Observable<any> {
    return this.httpClient.put(this.API_URL + `api/sub-users/${id}`, payload);
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
