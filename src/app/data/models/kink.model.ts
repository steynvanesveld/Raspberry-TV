import { AbstractModel } from './abstract.model';

export class Kink extends AbstractModel {
    constructor(
        public stations: any,
        public playing: string,
        public extended: any,
        public hitlist: boolean
    ) {
        super();
    }
}
