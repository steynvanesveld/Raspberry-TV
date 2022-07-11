import { AbstractModel } from './abstract.model';

export class Favorites extends AbstractModel {
    constructor(public favorites: Array<string>) {
        super();
    }
}
