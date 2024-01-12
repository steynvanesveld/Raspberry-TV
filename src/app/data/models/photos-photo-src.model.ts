import { AbstractModel } from './abstract.model';

export class PhotosPhotoSrc extends AbstractModel {
    constructor(
        public original: string,
        public large2x: string,
        public large: string,
        public medium: string,
        public small: string,
        public portrait: string,
        public landscape: string,
        public tiny: string,
    ) {
        super();
    }
}
