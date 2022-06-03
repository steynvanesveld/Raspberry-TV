import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Serializer } from '../serializers/serializer';
import { AbstractModel } from '../models/abstract.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    public baseUrl: string | undefined;
    public resource: string | undefined;
    public serializer: Serializer | undefined;

    constructor(private http: HttpClient) {
        this.http = http;
    }

    public read(): Observable<T> {
        return this.http
            .get(`${this.baseUrl}${this.resource}`, {
                headers: this.headers,
                params: this.params,
            })
            .pipe(map((data: object) => this.serializer?.fromJson(data) as T));
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
