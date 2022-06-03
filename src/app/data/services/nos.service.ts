import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorsProxyService } from './cors-proxy.service';

@Injectable({
    providedIn: 'root',
})
export class NosService extends CorsProxyService {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setResource('http://feeds.nos.nl');
    }

    public getGeneralNews() {
        const httpParams = {
            format: 'xml',
        };

        this.setParams(httpParams);
        // this.setSerializer(new PhotosSerializer());

        return this.read('/nosnieuwsalgemeen');
    }
}
