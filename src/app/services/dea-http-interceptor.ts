import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from './bearer-token/bearer-token.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private bearerTokenService: BearerTokenService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({
      'Token': sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ""

    })
    request = request.clone({ headers });
    return next.handle(request);
  }
}