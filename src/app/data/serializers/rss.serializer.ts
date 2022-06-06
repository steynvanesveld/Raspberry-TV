import { RssItem } from '../models/rss-item.model';
import { Rss } from 'src/app/data/models/rss.model';

export class RssSerializer {
    public findItemsInXML(items: any): any {
        const xmlItems = new window.DOMParser().parseFromString(
            items,
            'text/xml'
        );

        return Array.from(xmlItems.querySelectorAll('item')).map((item) => {
            return new RssItem(
                item
                    .querySelector('title')
                    ?.innerHTML.replace('<![CDATA[', '')
                    .replace(']]>', '') ?? '',
                item
                    .querySelector('description')
                    ?.innerHTML.replace('<![CDATA[', '')
                    .replace(']]>', '') ?? ''
            );
        });
    }

    public fromJson(json: Rss): Rss {
        return new Rss(this.findItemsInXML(json));
    }

    public toJson(rss: Rss): object {
        return {
            items: rss.items,
        };
    }
}
