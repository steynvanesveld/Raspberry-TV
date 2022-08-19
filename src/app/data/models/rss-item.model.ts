import { AbstractModel } from './abstract.model';

export class RssItem extends AbstractModel {
    constructor(
        public description: string,
        public pubDate: Date,
        public title?: string,
        public link?: string,
        public readablePubDate?: string,
        public source?: string
    ) {
        super();
    }
}
