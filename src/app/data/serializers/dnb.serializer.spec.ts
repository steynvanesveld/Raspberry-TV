import { DNB } from '../models/dnb.model';
import { TestBed } from '@angular/core/testing';
import { DNBSerializer } from './dnb.serializer';
import { RadioServiceMock } from '../services/mocks/radio.service.mock';

describe('DNBSerializer', () => {
    let serializer: DNBSerializer;
    const mock = new RadioServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DNBSerializer],
        });

        serializer = TestBed.inject(DNBSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getNowPlayingDNB().subscribe((data) => {
            expect(serializer.fromJson(data as DNB)).toEqual(data as DNB);
        });
    });

    it('should serialize from model to json', () => {
        mock.getNowPlayingDNB().subscribe((data) => {
            expect(typeof serializer.toJson(data as DNB)).toBe('object');
        });
    });
});
