import { AbstractModel } from './abstract.model';

export class OVPVideoThumb extends AbstractModel {
    constructor(
        public size: number,
        public width: number,
        public height: number,
        public src: string
    ) {
        super();
    }
}
