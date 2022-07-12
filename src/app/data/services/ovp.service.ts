import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OVPSerializer } from '../serializers/ovp.serializer';
import { OVPVideoSerializer } from '../serializers/ovp-video.serializer';

@Injectable({
    providedIn: 'root',
})
export class OVPService extends HttpService<any> {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.setSerializer(new OVPSerializer());
        this.setBaseUrl(environment.ovp_api_url);
    }

    public searchOVP(order: string, page: number, query?: string) {
        this.setResource('/search/');

        const httpParams = {
            query: query ?? '',
            per_page: 100,
            page,
            thumbsize: 'big',
            order,
            ...environment.ovp_api_params,
        };

        this.setParams(httpParams);

        return this.read();
    }
}
