import { OVPVideo } from './ovp-video.model';
import { AbstractModel } from './abstract.model';

export class OVP extends AbstractModel {
    constructor(
        public count: number,
        public start: number,
        public per_page: number,
        public page: number,
        public time_ms: number,
        public total_count: number,
        public total_pages: number,
        public videos: OVPVideo[]
    ) {
        super();
    }
}
