import { TestBed } from '@angular/core/testing';
import { OVPVideo } from '../models/ovp-video.model';
import { OVPVideoSerializer } from './ovp-video.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { OVPVideoServiceMock } from '../services/mocks/ovpvideo.service.mock';

describe('OVPVideoSerializer', () => {
    let serializer: OVPVideoSerializer;
    const mock = new OVPVideoServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [OVPVideoSerializer],
        });

        serializer = TestBed.inject(OVPVideoSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getOVPVideo().subscribe((data: OVPVideo) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getOVPVideo().subscribe((data: OVPVideo) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
