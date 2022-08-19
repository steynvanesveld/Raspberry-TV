import { Kink } from '../models/kink.model';
import { TestBed } from '@angular/core/testing';
import { KinkSerializer } from './kink.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { KinkServiceMock } from '../services/mocks/kink.service.mock';

describe('KinkSerializer', () => {
    let serializer: KinkSerializer;
    const mock = new KinkServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [KinkSerializer],
        });

        serializer = TestBed.inject(KinkSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getNowPlaying().subscribe((data: Kink) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getNowPlaying().subscribe((data: Kink) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
