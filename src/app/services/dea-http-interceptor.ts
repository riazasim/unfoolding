import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from './bearer-token/bearer-token.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private bearerTokenService: BearerTokenService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
const httpOptions = {
  withCredentials: true, 
};  
    

    const request = req.clone(httpOptions);


    return next.handle(request);
  }
}