import { AbstractModel } from './abstract.model';
import { FluxArtist } from './flux-artists.model';

export class FluxTrackInfo extends AbstractModel {
    constructor(
        public title: string,
        public artistCredits: string,
        public artists: FluxArtist[],
    ) {
        super();
    }
}
