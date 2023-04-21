import { AbstractModel } from './abstract.model';
import { FluxTrackInfo } from './flux-track-info.model';

export class Flux extends AbstractModel {
    constructor(public trackInfo: FluxTrackInfo) {
        super();
    }
}
