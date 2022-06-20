import { AbstractModel } from './abstract.model';

export class OVPVideoThumb extends AbstractModel {
    constructor(
        public size: string,
        public width: string,
        public height: string,
        public src: string
    ) {
        super();
    }
}
