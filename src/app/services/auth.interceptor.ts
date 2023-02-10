import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.router.url !='/portal/sign-in') {
      const headers = new HttpHeaders({
        'Authorization':'Bearer '+ sessionStorage.getItem('token')
      })
      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}