import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OVPSerializer } from '../serializers/ovp.serializer';
import { OVPVideoSerializer } from '../serializers/ovp-video.serializer';

@Injectable({
    providedIn: 'root',
})
export class OVPVideoService extends HttpService<any> {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setSerializer(new OVPVideoSerializer());
        this.setBaseUrl(environment.ovp_api_url);
    }

    public getOVPVideo(id: string) {
        this.setResource('/id/');

        const httpParams = {
            id: id ?? '',
        };

        this.setParams(httpParams);
        return this.read();
    }
}
