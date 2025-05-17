import { Npm } from '@data/models/npm.model';

export class NpmSerializer {
    public fromJson(json: Npm): Npm {
        return new Npm(json.name, json['dist-tags']);
    }

    public toJson(npm: Npm): object {
        return {
            name: npm.name,
            'dist-tags': npm.distTags,
        };
    }
}
