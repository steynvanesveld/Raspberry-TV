import { AbstractModel } from './abstract.model';

export class Kink extends AbstractModel {
    constructor(
        public stations: any, // API has illigal dashes in it, can't properly define
        public playing: string,
        public extended: any, // API has illigal dashes in it, can't properly define
        public hitlist: boolean,
    ) {
        super();
    }
}
