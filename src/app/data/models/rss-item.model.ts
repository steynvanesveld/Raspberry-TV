import { AbstractModel } from './abstract.model';

export class RssItem extends AbstractModel {
    constructor(public title: string, public description: string) {
        super();
    }
}
