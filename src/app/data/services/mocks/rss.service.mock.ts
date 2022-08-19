import { Observable, of } from 'rxjs';
import { Rss } from '../../models/rss.model';
import { RssItem } from '../../models/rss-item.model';

export class RssServiceMock {
    public xmlEmpty = `<?xml version="1.0" encoding="UTF-8"?>
        <rss>
            <channel>
                <item></item>
            </channel>
        </rss>
    `;

    public xmlVersion1 = `<?xml version="1.0" encoding="UTF-8"?>
        <rss>
            <channel>
                <item>
                    <title><![CDATA[Item title]]></title>
                    <link>https://item.link</link>
                    <description><![CDATA[<p>Description</p>]]></description>
                    <pubDate>Thu, 01 Jan 1970 01:00:00</pubDate>
                </item>
            </channel>
        </rss>
    `;

    public htmlEmpty = `<!doctype html>
        <html>
            <body></body>
        </html>
    `;

    public htmlVersion1 = `<!doctype html>
        <html>
            <body>
                <div class="article-page__body"><p>Description</p></div>
            </body>
        </html>
    `;

    public htmlVersion2 = `<!doctype html>
        <html>
            <body>
                <div class="article-content"><p>Description</p></div>
            </body>
        </html>
    `;

    public getRss(): Observable<Rss> {
        return of(new Rss([new RssItem('', new Date(0))]));
    }
}
