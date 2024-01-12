import { OVP } from '../models/ovp.model';
import { OVPVideo } from '../models/ovp-video.model';

export class OVPSerializer {
    private setVideos(videos: OVPVideo[]): OVPVideo[] {
        videos?.forEach((video) => (video.current_thumb = video.default_thumb));
        return videos;
    }

    public fromJson(json: OVP): OVP {
        return new OVP(
            json.count,
            json.start,
            json.per_page,
            json.page,
            json.time_ms,
            json.total_count,
            json.total_pages,
            this.setVideos(json.videos),
        );
    }

    public toJson(ovp: OVP): object {
        return {
            count: ovp.count,
            start: ovp.start,
            per_page: ovp.per_page,
            page: ovp.page,
            time_ms: ovp.time_ms,
            total_count: ovp.total_count,
            total_pages: ovp.total_pages,
            videos: ovp.videos,
        };
    }
}
