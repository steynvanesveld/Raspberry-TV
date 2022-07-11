import { RssItem } from './rss-item.model';
import { AbstractModel } from './abstract.model';

export class System extends AbstractModel {
    constructor(
        public model: string,
        public ram_usage: string,
        public load: string,
        public temp: string
    ) {
        super();
    }
}
