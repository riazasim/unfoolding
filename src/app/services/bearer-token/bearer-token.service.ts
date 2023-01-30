import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Nullable } from 'src/app/models/nullable.type';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  private readonly authTokenStorageKey = 'token';
  private readonly authCookieStorageKey = 'PHPSESSID';
  constructor(private cookieService: CookieService){}

  public get authToken(): Nullable<string> {
    return sessionStorage.getItem(this.authTokenStorageKey);
  }

  public get authCookie(): Nullable<string> {
    return this.cookieService.get(this.authCookieStorageKey);
  }

  public set authToken(token: Nullable<string>) {
    if (typeof token === 'string') {
      sessionStorage.setItem(this.authTokenStorageKey, token);
    } else {
      sessionStorage.removeItem(this.authTokenStorageKey);
    }
  }

  public set authCookie(token: Nullable<string>) {
    if (typeof token === 'string') {
      this.cookieService.set(this.authCookieStorageKey, token)
    } else {
      this.cookieService.delete(this.authCookieStorageKey)
    }
  }

}
