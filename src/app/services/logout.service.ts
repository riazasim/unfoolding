import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { DeaApiModel } from '../models/api.type';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private readonly apiClient: GenericApiService<DeaApiModel>) {}

  // public logout(): Observable<void> {
  //   return EMPTY;
  // }
}
