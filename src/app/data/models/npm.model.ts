import { AbstractModel } from './abstract.model';

export class Npm extends AbstractModel {
    public 'dist-tags'?: {
        latest: string;
    };

    constructor(
        public name: string,
        public distTags?: { latest: string },
    ) {
        super();
    }
}
