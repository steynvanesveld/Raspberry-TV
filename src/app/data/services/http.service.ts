import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Serializer } from '../serializers/serializer';
import { AbstractModel } from '../models/abstract.model';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export abstract class HttpService<T extends AbstractModel> {
    public headers: HttpHeaders | undefined;
    public params:
        | {
              [param: string]:
                  | string
                  | number
                  | boolean
                  | ReadonlyArray<string | number | boolean>;
          }
        | undefined;
    public baseUrl!: string;
    public resource!: string;
    public serializer!: Serializer;

    constructor(public http: HttpClient) {
        this.http = http;
    }

    public read(): Observable<T> {
        return this.http
            .get(`${this.baseUrl}${this.resource}`, {
                headers: this.headers,
                params: this.params,
            })
            .pipe(
                map((data: object) => this.serializer.fromJson(data) as T),
                catchError((error) => this.catchError(error))
            );
    }

    public create(body: object): Observable<T> {
        return this.http
            .post(`${this.baseUrl}${this.resource}`, body, {
                headers: this.headers,
                params: this.params,
            })
            .pipe(map((data: object) => this.serializer.fromJson(data) as T));
    }

    public catchError(error: HttpErrorResponse): Observable<T> {
        return throwError(() => error);
    }

    public setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    public setResource(resource: string): void {
        this.resource = resource;
    }

    public setHeaders(headers: HttpHeaders): void {
        this.headers = headers;
    }

    public setParams(params: {
        [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
    }): void {
        this.params = params;
    }

    public setSerializer(serializer: Serializer): void {
        this.serializer = serializer;
    }
}
