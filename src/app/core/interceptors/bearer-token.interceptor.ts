import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, catchError, throwError } from 'rxjs';
import { BearerTokenService } from 'src/app/services/bearer-token/bearer-token.service';
import { SESSION_TOKEN } from '../constants/auth.constant';

export const NO_TOKEN_REQUEST = new HttpContextToken(() => false);

/**
 * Sets the Authorization header in the requests
 */
@Injectable({
  providedIn: 'root'
})
export class BearerTokenInterceptor implements HttpInterceptor {

  private readonly authorizationHeaderName = 'Authorization';

  constructor(private readonly tokenService: BearerTokenService,
              private readonly router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.authToken;
    const noTokenRequestFlag = request.context.get(NO_TOKEN_REQUEST);
    if ((typeof token === 'string') && !noTokenRequestFlag) {
      request = request.clone({
        setHeaders: { [this.authorizationHeaderName]: token }
      });
    }

    return next.handle(request).pipe(
      catchError( (response: any) => {
        if(response.status === 401) {
          document.cookie = `${SESSION_TOKEN}=; Max-Age=0;`;
          this.router.navigate(['/']);
        }
        return throwError(() => new Error(response));
      }),
      map(event => {
        if (event instanceof HttpResponse && ([100,101,200,400,500,401,403].includes(event.status))) {
            console.log('response', event.body);
        }       
        return event;
      }),
    )
  }


}
