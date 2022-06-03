import { AbstractModel } from './abstract.model';
import { PhotosPhoto } from './photos-photo.model';

export class Photos extends AbstractModel {
    constructor(
        public total_results: number,
        public page: number,
        public per_page: number,
        public photos: PhotosPhoto[],
        public next_page: string
    ) {
        super();
    }
}
