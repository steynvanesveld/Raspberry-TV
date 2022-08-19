import { TestBed } from '@angular/core/testing';
import { Photos } from '../models/photos.model';
import { PhotosSerializer } from './photos.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { PexelsServiceMock } from '../services/mocks/pexels.service.mock';

describe('PhotosSerializer', () => {
    let serializer: PhotosSerializer;
    const mock = new PexelsServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [PhotosSerializer],
        });

        serializer = TestBed.inject(PhotosSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getPhotos().subscribe((data: Photos) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getPhotos().subscribe((data: Photos) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
