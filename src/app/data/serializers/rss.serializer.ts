import { RssItem } from '../models/rss-item.model';
import { Rss } from 'src/app/data/models/rss.model';

export class RssSerializer {
    public dateTime(date: Date): string {
        const checkDate = new Date();

        const newsItemTime = `om ${date.toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;

        if (checkDate.toDateString() === date.toDateString()) {
            return `Vandaag ${newsItemTime}`;
        }

        checkDate.setDate(checkDate.getDate() - 1);

        if (checkDate.toDateString() === date.toDateString()) {
            return `Gisteren ${newsItemTime}`;
        }

        checkDate.setDate(checkDate.getDate() - 1);

        if (checkDate.toDateString() === date.toDateString()) {
            return `Eergisteren ${newsItemTime}`;
        }

        return `${date.toLocaleDateString('nl-NL', {
            day: 'numeric',
            month: 'short',
        })} ${newsItemTime}`;
    }

    public findItems(items: string): RssItem[] {
        if (items.includes('<?xml')) {
            const xml = new window.DOMParser().parseFromString(
                items,
                'text/xml',
            );

            return Array.from(xml.querySelectorAll('item'))
                .slice(0, 20)
                .map((item) => {
                    const date = new Date(
                        this.getTextFromElement(item, 'pubDate') ?? 0,
                    );

                    return new RssItem(
                        this.getTextFromElement(item, 'description') ?? '',
                        date,
                        this.getTextFromElement(item, 'title') ?? '',
                        this.getTextFromElement(item, 'link') ?? '',
                        this.dateTime(date),
                    );
                });
        }

        const html = new window.DOMParser().parseFromString(items, 'text/html');

        return [
            new RssItem(
                this.getTextFromElement(html, '.article-page__body') ??
                    this.getTextFromElement(html, '.article-content') ??
                    '',
                new Date(0),
            ),
        ];
    }

    public getTextFromElement(
        element: Element | Document,
        selector: string,
    ): string | undefined {
        return element
            .querySelector(selector)
            ?.innerHTML.replace('<![CDATA[', '')
            .replace(']]>', '');
    }

    public fromJson(json: Rss): Rss {
        if (!json) return new Rss([]);

        return new Rss(this.findItems(json.toString()));
    }

    public toJson(rss: Rss): object {
        return {
            items: rss.items,
        };
    }
}
