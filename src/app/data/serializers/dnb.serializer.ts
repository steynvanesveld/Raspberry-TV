import { DNB } from '../models/dnb.model';

export class DNBSerializer {
    public fromJson(json: DNB): DNB {
        return new DNB(json.title, json.artist);
    }

    public toJson(dnb: DNB): object {
        return {
            title: dnb.title,
            artist: dnb.artist,
        };
    }
}
