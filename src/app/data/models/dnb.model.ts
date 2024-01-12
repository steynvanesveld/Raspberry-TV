import { AbstractModel } from './abstract.model';

export class DNB extends AbstractModel {
    constructor(
        public title: string,
        public artist: string,
    ) {
        super();
    }
}
