/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable, of } from 'rxjs';
import { Rss } from '../../models/rss.model';
import { RssItem } from '../../models/rss-item.model';

export const newsItem = new RssItem(
    '<div>Detailed content</div>',
    new Date(0),
    'News item',
    'http://link',
    '01/01 om 00:00',
);

export class NewsServiceMock {
    public getNewsItem(link?: string): Observable<Rss> {
        return of(new Rss([new RssItem('<div>Detailed content</div>', new Date(0))]));
    }

    public getNewsItemPayWall(link?: string): Observable<Rss> {
        return of(
            new Rss([new RssItem('<div>Detailed content paywall-initial</div>', new Date(0))]),
        );
    }

    public getEasterEggNews(): Observable<Rss> {
        return of(new Rss([newsItem, newsItem]));
    }

    public getNos(): Observable<Rss> {
        return of(new Rss([newsItem, newsItem]));
    }

    public getHoogeveenscheCourant(): Observable<Rss> {
        return of(new Rss([newsItem, newsItem]));
    }

    public getRTVDrenthe(): Observable<Rss> {
        return of(new Rss([newsItem, newsItem]));
    }
}
