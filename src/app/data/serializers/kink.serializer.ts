import { Kink } from '../models/kink.model';

export class KinkSerializer {
    public fromJson(json: Kink): Kink {
        return new Kink(
            json.stations,
            json.playing,
            json.extended,
            json.hitlist
        );
    }

    public toJson(kink: Kink): object {
        return {
            stations: kink.stations,
            playing: kink.playing,
            extended: kink.extended,
            hitlist: kink.hitlist,
        };
    }
}
