import { Injectable } from '@angular/core';
import { RssService } from './rss.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class NewsService extends RssService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public getNewsItem(link?: string) {
        this.setResource(link ?? '');
        return this.read();
    }

    public getNos() {
        this.setResource('http://feeds.nos.nl/nosnieuwsalgemeen?format=xml');
        return this.read();
    }

    public getHoogeveenscheCourant() {
        this.setResource('https://hoogeveenschecourant.nl/api/feed/rss');
        return this.read();
    }

    public getRTVDrenthe() {
        this.setResource('https://www.rtvdrenthe.nl/rss/index.xml');
        return this.read();
    }
}
