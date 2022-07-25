import { AbstractModel } from './abstract.model';

export class RssItem extends AbstractModel {
    constructor(
        public description: string,
        public title: string,
        public link: string,
        public pubDate: Date,
        public readablePubDate: string,
        public source?: string
    ) {
        super();
    }
}
