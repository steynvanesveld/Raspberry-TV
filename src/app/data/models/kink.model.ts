import { AbstractModel } from './abstract.model';

export class Kink extends AbstractModel {
    constructor(
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        public stations: any, // API has illigal dashes in it, can't properly define
        public playing: string,
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        public extended: any, // API has illigal dashes in it, can't properly define
        public hitlist: boolean,
    ) {
        super();
    }
}
