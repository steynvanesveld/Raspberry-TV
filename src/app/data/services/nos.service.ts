import { Injectable } from '@angular/core';
import { RssService } from './rss.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class NosService extends RssService {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setResource('http://feeds.nos.nl');
    }

    public getGeneralNews() {
        const httpParams = {
            format: 'xml',
        };

        this.setParams(httpParams);

        return this.read('/nosnieuwsalgemeen');
    }
}
