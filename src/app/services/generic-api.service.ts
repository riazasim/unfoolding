import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { prefix } from '@fortawesome/pro-regular-svg-icons';
import { url } from '@rxweb/reactive-form-validators';
import { namespaces } from 'd3-selection';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeaApiNamespaces } from '../models/api.type';
import { ResponseArrayWrapper, ResponseItemWrapper } from '../models/response-wrappers.types';
import { GenericApiModule } from '../shared/generic-api.module';
import { convertJsonToFormData, 
        handleHttpError, 
        pluckArrayWrapperData, 
        pluckItemWrapperData, 
        wrapJsonForRequest, 
        wrapJsonListForRequest } from '../shared/utils/api.functions';
import { BearerTokenService } from './bearer-token/bearer-token.service';
import { API_NAMESPACE, API_ROOT } from './injection-tokens';
import { SuccessResponse } from './status-responses.types';

@Injectable({
  providedIn: GenericApiModule
})
export class GenericApiService<NS> {
  apiNamespaces: any = new DeaApiNamespaces();
  constructor(
    protected readonly httpClient: HttpClient,
    private bearerTokenService: BearerTokenService,
    @Inject(API_ROOT) @Optional() protected readonly apiRoot: string) {
    this.apiRoot = apiRoot ?? environment.API_URL;
  
  }

  /**
   * Calls either GenericApiService.url or GenericApiService.reverseUrl depending on the reverse param
   * @param namespaceSegment
   * @param segment
   * @param reverse
   * @private
   */
  public buildUrl(namespaceSegment: keyof NS, segment: string, reverse: boolean = false): string {
    return reverse ? this.reverseUrl(namespaceSegment, segment) : this.url(namespaceSegment, segment);
  }

  /**
   * Concatenates the root, the namespace segment and the rest of the URL
   * @param namespaceSegment
   * @param segment
   * @protected
   */
  private url(namespaceSegment: keyof NS, segment: string): string {

    return `${this.apiRoot}${this.apiNamespaces[namespaceSegment]}/${segment}`;
  }

  /**
   * Same as requestUrl(), but reverses the root with the namespace segment
   * @param namespaceSegment
   * @param segment
   * @protected
   */
  private reverseUrl(namespaceSegment: keyof NS, segment: string): string {
    return `${this.apiNamespaces[namespaceSegment]}${this.apiRoot}/${segment}`;
  }

  /**
   * A request for a single value. Will pluck automatically from the wrapper.
   * And will throw an ErrorResponse object on error
   * @param namespaceSegment
   * @param segment
   * @param reverse
   * @protected
   */
  public getOne<T>(namespaceSegment: keyof NS, segment: string, reverse: boolean = false): Observable<T> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    return this.httpClient.get<ResponseItemWrapper<T>>(url)
      .pipe(
        pluckItemWrapperData<T, ResponseItemWrapper<T>>(),
        catchError(err => throwError(() => handleHttpError(err)))
      );
  }

  /**
   * A request for an array of values. Will pluck automatically from the wrapper.
   * And will throw an ErrorResponse object on error
   * @param namespaceSegment
   * @param segment
   * @param reverse
   * @protected
   */
  public getArray<T>(namespaceSegment: keyof NS, segment: string, reverse: boolean = false): Observable<T[]> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    return this.httpClient.get<ResponseArrayWrapper<T>>(url)
      .pipe(
        pluckArrayWrapperData<T, ResponseArrayWrapper<T>>(),
        catchError(err => throwError(() => handleHttpError(err)))
      );
  }

  /**
   * A get request that will return exactly the given T type. No plucking is done
   * Will throw an ErrorResponse object on error
   * @param namespaceSegment
   * @param segment
   * @param reverse
   * @protected
   */
  public get<T>(namespaceSegment: keyof NS, segment: string, reverse: boolean = false): Observable<T> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    return this.httpClient.get<T>(url).pipe(
      catchError(err => throwError(() => handleHttpError(err)))
    );
  }

  /**
   * Posts JSON data, but will wrap the body into a special object.
   * Will throw an ErrorResponse object on error. No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param reverse
   * @protected
   */
  // public postJSONWrappedData<B, R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: B, reverse: boolean = false): Observable<R> {
  public postJSONWrappedData<B, R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: B, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    const data = wrapJsonForRequest(body);
  
    return this.httpClient.post<R>(url, data)
      .pipe(
        catchError(err => throwError(() => handleHttpError(err)))
      );
  }

  /**
   * Post a JSON array, but will be wrapped into a special object
   * Will throw an ErrorResponse object on error.
   * No plucking is done on response
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param type
   * @param reverse
   */
  public postJSONListWrappedData<B extends ReadonlyArray<unknown>, R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: B, type: string, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    const payload = wrapJsonListForRequest(type, body);
    return this.httpClient.post<R>(url, payload)
      .pipe(
        catchError(err => throwError(() => handleHttpError(err)))
      );
  }

  /**
   * Transforms a JSON into FormData. It uses the data[attributes] prefix.
   * Will throw an ErrorResponse object on error. No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param prefix
   * @param reverse
   * @public
   */
  public postFormData<R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: unknown, prefix: string = 'data[attributes]', reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    const formData: FormData = convertJsonToFormData(body, prefix);
    return this.httpClient.post<R>(url, formData)
      .pipe(
        catchError(err => throwError(() => handleHttpError(err)))
      );
  }

  /**
   * Will post anything directly, without wrapping or converting, and returns exactly the given type.
   * No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param reverse
   * @public
   */
  public post<R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: unknown, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    return this.httpClient.post<R>(url, body)
      .pipe(
        catchError(err => throwError(() => handleHttpError(err)))
      );
  }

  /**
   * Puts anything directly, without wrapping or converting and returns exactly the given type
   * No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param reverse
   */
  public put<R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: unknown, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    return this.httpClient.put<R>(url, body).pipe(
      catchError(err => throwError(() => handleHttpError(err)))
    );
  }

  /**
   * Puts form data, by converting the given JSON and returns exactly the given type
   * No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param reverse
   */
  public putFormData<R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: unknown, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    const payload: FormData = convertJsonToFormData(body, 'data[attributes]');
    return this.httpClient.put<R>(url, payload).pipe(
      catchError(err => throwError(() => handleHttpError(err)))
    );
  }

  /**
   * Puts the given object, but first it wraps it into the SpAccessWrapper
   * No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param reverse
   */
  public putJSONWrappedData<R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, body: unknown, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    const payload = wrapJsonForRequest(body);
    return this.httpClient.put<R>(url, payload).pipe(
      catchError(err => throwError(() => handleHttpError(err)))
    );
  }

  /**
   * Puts the given object, but first it wraps it into the SpAccessWrapper
   * No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param body
   * @param type
   * @param reverse
   */
  public putJSONListWrappedData<B extends ReadonlyArray<unknown>, R = SuccessResponse>
    (namespaceSegment: keyof NS, segment: string, body: B, type: string, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    const payload = wrapJsonListForRequest(type, body);
    return this.httpClient.put<R>(url, payload).pipe(
      catchError(err => throwError(() => handleHttpError(err)))
    );
  }

  /**
   * Deletes the specified resource and returns the given type.
   * No plucking is done
   * @param namespaceSegment
   * @param segment
   * @param reverse
   */
  public delete<R = SuccessResponse>(namespaceSegment: keyof NS, segment: string, reverse: boolean = false): Observable<R> {
    const url = this.buildUrl(namespaceSegment, segment, reverse);
    return this.httpClient.delete<R>(url).pipe(
      catchError(err => throwError(() => handleHttpError(err)))
    );
  }

  public get root(): string {
    return this.apiRoot;
  }

  public get namespaces(): NS {
    return {
      ...this.apiNamespaces
    };
  }

}
