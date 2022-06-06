import { RssItem } from './rss-item.model';
import { AbstractModel } from './abstract.model';

export class Rss extends AbstractModel {
    constructor(public items: RssItem[]) {
        super();
    }
}
