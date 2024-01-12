import { AbstractModel } from './abstract.model';
import { PhotosPhotoSrc } from './photos-photo-src.model';

export class PhotosPhoto extends AbstractModel {
    constructor(
        public width: number,
        public height: number,
        public url: string,
        public photographer: string,
        public photographer_url: string,
        public photographer_id: number,
        public avg_color: string,
        public src: PhotosPhotoSrc,
        public liked: boolean,
        public alt: string,
    ) {
        super();
    }
}
