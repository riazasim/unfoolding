import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeaApiNamespaces } from '../models/api.type';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class DeaUsageApiService {
  private API_URL=environment.API_URL;
  constructor(private readonly apiClient: GenericApiService<DeaApiNamespaces>,
    private readonly httpClient:HttpClient) {
  }

  // public getUsageList(): Observable<any> {
  //   return this.apiClient.getArray('default', 'sub-user-usages');
  // }
  public getUsageList(id:number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL+'api/sub-user-usages/'+id);
  }

  public exportUserUsage(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL+'api/sub-user-usages/export-csv');
    // return this.apiClient.get('default','sub-user-usages/export-csv');
  }

}
