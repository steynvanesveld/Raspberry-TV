import { AbstractModel } from '@data/models/abstract.model';

export interface Serializer {
    fromJson(json: AbstractModel): AbstractModel;
    toJson(resource: AbstractModel): object;
}
