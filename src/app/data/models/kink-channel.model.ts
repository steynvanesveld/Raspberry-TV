import { AbstractModel } from './abstract.model';

export class KinkChannel extends AbstractModel {
    constructor(public name: string, public url: string) {
        super();
    }
}
