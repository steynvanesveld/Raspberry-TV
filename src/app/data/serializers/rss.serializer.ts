import { RssItem } from '../models/rss-item.model';
import { Rss } from 'src/app/data/models/rss.model';

export class RssSerializer {
    public dateTime(date: Date): string {
        const today = new Date();

        let newsItemDate = date.toLocaleDateString('nl-NL', {
            day: '2-digit',
            month: '2-digit',
        });

        if (today.toDateString() === date.toDateString()) {
            newsItemDate = 'Vandaag';
        } else {
            today.setDate(today.getDate() - 1);

            if (today.toDateString() === date.toDateString()) {
                newsItemDate = 'Gisteren';
            }
        }

        return `${newsItemDate} om ${date.toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        })}`;
    }

    public findItems(items: string): RssItem[] {
        if (items.includes('<?xml')) {
            const xml = new window.DOMParser().parseFromString(
                items,
                'text/xml'
            );

            return Array.from(xml.querySelectorAll('item'))
                .slice(0, 20)
                .map((item) => {
                    const date = new Date(
                        item.querySelector('pubDate')?.innerHTML ?? ''
                    );

                    const title =
                        item
                            .querySelector('title')
                            ?.innerHTML.replace('<![CDATA[', '')
                            .replace(']]>', '') ?? '';

                    const description =
                        item
                            .querySelector('description')
                            ?.innerHTML.replace('<![CDATA[', '')
                            .replace(']]>', '') ?? '';

                    const link = item.querySelector('link')?.innerHTML ?? '';

                    return new RssItem(
                        description,
                        title,
                        link,
                        date,
                        this.dateTime(date)
                    );
                });
        }

        const html = new window.DOMParser().parseFromString(items, 'text/html');

        return [
            new RssItem(
                html.querySelector('.article-page__body')?.innerHTML ??
                    html.querySelector('.article-content')?.innerHTML ??
                    '',
                '',
                '',
                new Date(),
                ''
            ),
        ];
    }

    public fromJson(json: Rss): Rss {
        return new Rss(this.findItems(json as unknown as string));
    }

    public toJson(rss: Rss): object {
        return {
            items: rss.items,
        };
    }
}
