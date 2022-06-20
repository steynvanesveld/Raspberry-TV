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

        this.setBaseUrl(environment.ovp_api_url);
    }

    public searchOVP(query?: string) {
        this.setSerializer(new OVPSerializer());
        this.setResource('/search/');

        const httpParams = {
            query: query ?? '',
            lq: '0',
            per_page: '100',
            thumbsize: 'big',
            order: 'top-weekly',
        };

        this.setParams(httpParams);

        return this.read();
    }

    public getOVPVideo(id: string) {
        this.setSerializer(new OVPVideoSerializer());
        this.setResource('/id/');

        const httpParams = {
            id: id ?? '',
        };

        this.setParams(httpParams);

        return this.read();
    }
}
