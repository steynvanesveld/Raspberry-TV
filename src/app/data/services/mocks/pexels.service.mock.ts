import { Observable, of } from 'rxjs';
import { Photos } from '../../models/photos.model';
import { PhotosPhoto } from '../../models/photos-photo.model';
import { PhotosPhotoSrc } from '../../models/photos-photo-src.model';

const pexelsPhoto = new PhotosPhoto(
    1920,
    1080,
    'photo.jpg',
    'Photographer',
    'photographer_url',
    1,
    '#ffffff',
    new PhotosPhotoSrc(
        'original.jpg',
        'large2x.jpg',
        'large.jpg',
        'medium.jpg',
        'smalljpg',
        'portrait.jpg',
        'landscape.jog',
        'tiny.jpg',
    ),
    false,
    'Photo alt',
);

const pexelsPhotoArray = (): PhotosPhoto[] => {
    const maxDaysInMonth = 31;
    const array = [];

    for (let i = 0; i <= maxDaysInMonth; i++) {
        array.push(pexelsPhoto);
    }

    return array;
};

export class PexelsServiceMock {
    getPhotos(): Observable<Photos> {
        return of(new Photos(420, 1, 60, pexelsPhotoArray(), 'next_page'));
    }
}
