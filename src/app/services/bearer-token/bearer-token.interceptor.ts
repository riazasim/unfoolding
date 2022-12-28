import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BearerTokenService } from './bearer-token.service';

export const NO_TOKEN_REQUEST = new HttpContextToken(() => false);

/**
 * Sets the Authorization header in the requests
 */
@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {

  private readonly authorizationHeaderName = 'Authorization';

  constructor(private readonly tokenService: BearerTokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.authToken;
    const noTokenRequestFlag = request.context.get(NO_TOKEN_REQUEST);
    if ((typeof token === 'string') && !noTokenRequestFlag) {
      request = request.clone({
        setHeaders: { [this.authorizationHeaderName]: token }
      });
    }
    return next.handle(request);
  }


}
