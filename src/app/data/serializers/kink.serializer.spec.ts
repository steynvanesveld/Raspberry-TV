import { TestBed } from '@angular/core/testing';
import { KinkSerializer } from './kink.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { RadioServiceMock } from '../services/mocks/radio.service.mock';

describe('KinkSerializer', () => {
    let serializer: KinkSerializer;
    const mock = new RadioServiceMock();

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
        mock.getNowPlayingKink().subscribe((data: any) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getNowPlayingKink().subscribe((data: any) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
