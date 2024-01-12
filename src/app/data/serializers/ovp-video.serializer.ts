import { OVPVideo } from '../models/ovp-video.model';

export class OVPVideoSerializer {
    public fromJson(json: OVPVideo): OVPVideo {
        return new OVPVideo(
            json.id,
            json.title,
            json.keywords,
            json.views,
            json.rate,
            json.url,
            json.added,
            json.length_sec,
            json.length_min,
            json.embed,
            json.default_thumb,
            json.thumbs,
            json.current_thumb,
        );
    }

    public toJson(ovpVideo: OVPVideo): object {
        return {
            id: ovpVideo.id,
            title: ovpVideo.title,
            keywords: ovpVideo.keywords,
            views: ovpVideo.views,
            rate: ovpVideo.rate,
            url: ovpVideo.url,
            added: ovpVideo.added,
            length_sec: ovpVideo.length_sec,
            length_min: ovpVideo.length_min,
            embed: ovpVideo.embed,
            default_thumb: ovpVideo.default_thumb,
            thumbs: ovpVideo.thumbs,
            current_thumb: ovpVideo.current_thumb,
        };
    }
}
