import { Flux } from '../models/flux.model';

export class FluxSerializer {
    public fromJson(json: Flux): Flux {
        return new Flux(json.trackInfo);
    }

    public toJson(flux: Flux): object {
        return {
            trackInfo: flux.trackInfo,
        };
    }
}
