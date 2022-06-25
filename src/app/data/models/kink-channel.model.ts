import { AbstractModel } from './abstract.model';

export class KinkChannel extends AbstractModel {
    constructor(
        public apiName: string,
        public visibleName: string,
        public fileName: string
    ) {
        super();
    }
}
