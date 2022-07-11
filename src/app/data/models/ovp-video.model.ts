import { AbstractModel } from './abstract.model';
import { OVPVideoThumb } from './ovp-video-thumb.model';

export class OVPVideo extends AbstractModel {
    constructor(
        public override id: string,
        public title: string,
        public keywords: string,
        public views: number,
        public rate: number,
        public url: string,
        public added: string,
        public length_sec: number,
        public length_min: number,
        public embed: string,
        public default_thumb: OVPVideoThumb,
        public thumbs: OVPVideoThumb[],
        public current_thumb: OVPVideoThumb
    ) {
        super(id);
        this.current_thumb = this.default_thumb;
    }
}
