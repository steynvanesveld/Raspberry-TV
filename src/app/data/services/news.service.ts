import { Observable } from 'rxjs';
import { Rss } from '../models/rss.model';
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

    public getNewsItem(link: string): Observable<Rss> {
        this.setResource(link);
        return this.read();
    }

    public getNos(): Observable<Rss> {
        this.setResource('http://feeds.nos.nl/nosnieuwsalgemeen?format=xml');
        return this.read();
    }

    public getHoogeveenscheCourant(): Observable<Rss> {
        this.setResource('https://hoogeveenschecourant.nl/api/feed/rss');
        return this.read();
    }

    public getRTVDrenthe(): Observable<Rss> {
        this.setResource('https://www.rtvdrenthe.nl/rss/index.xml');
        return this.read();
    }
}
