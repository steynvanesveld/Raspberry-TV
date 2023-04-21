import { TestBed } from '@angular/core/testing';
import { FluxSerializer } from './flux.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { RadioServiceMock } from '../services/mocks/radio.service.mock';

describe('FluxSerializer', () => {
    let serializer: FluxSerializer;
    const mock = new RadioServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [FluxSerializer],
        });

        serializer = TestBed.inject(FluxSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getNowPlayingFlux('apiRef').subscribe((data: any) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getNowPlayingFlux('').subscribe((data: any) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
