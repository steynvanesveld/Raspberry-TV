import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export abstract class CorsProxyService extends HttpService<any> {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        const headers = {
            'x-cors-api-key': environment.cors_bridged_api_key,
        };

        this.setHeaders(new HttpHeaders(headers));

        this.setBaseUrl('https://proxy.cors.sh/');
    }
}
