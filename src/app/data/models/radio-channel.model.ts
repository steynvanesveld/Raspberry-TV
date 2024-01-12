import { AbstractModel } from './abstract.model';

export class RadioChannel extends AbstractModel {
    constructor(
        public file: string,
        public visibleName: string,
        public apiSrc: 'KINK' | 'FLUX' | 'DNB' | 'NONE',
        public apiRef: string,
    ) {
        super();
    }
}
