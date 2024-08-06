import { Kink } from '../models/kink.model';
import { TestBed } from '@angular/core/testing';
import { KinkSerializer } from './kink.serializer';
import { RadioServiceMock } from '../services/mocks/radio.service.mock';

describe('KinkSerializer', () => {
    let serializer: KinkSerializer;
    const mock = new RadioServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [KinkSerializer],
        });

        serializer = TestBed.inject(KinkSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getNowPlayingKink().subscribe((data) => {
            expect(serializer.fromJson(data as Kink)).toEqual(data as Kink);
        });
    });

    it('should serialize from model to json', () => {
        mock.getNowPlayingKink().subscribe((data) => {
            expect(typeof serializer.toJson(data as Kink)).toBe('object');
        });
    });
});
