import { Injectable } from '@angular/core';
import { Nullable } from 'src/app/models/nullable.type';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  private readonly authTokenStorageKey = 'token';

  public get authToken(): Nullable<string> {
    return sessionStorage.getItem(this.authTokenStorageKey);
  }

  public set authToken(token: Nullable<string>) {
    if (typeof token === 'string') {
      sessionStorage.setItem(this.authTokenStorageKey, token);
    } else {
      sessionStorage.removeItem(this.authTokenStorageKey);
    }
  }

}
