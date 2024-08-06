import { Flux } from '../models/flux.model';
import { TestBed } from '@angular/core/testing';
import { FluxSerializer } from './flux.serializer';
import { RadioServiceMock } from '../services/mocks/radio.service.mock';

describe('FluxSerializer', () => {
    let serializer: FluxSerializer;
    const mock = new RadioServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FluxSerializer],
        });

        serializer = TestBed.inject(FluxSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getNowPlayingFlux('apiRef').subscribe((data) => {
            expect(serializer.fromJson(data as Flux)).toEqual(data as Flux);
        });
    });

    it('should serialize from model to json', () => {
        mock.getNowPlayingFlux('').subscribe((data) => {
            expect(typeof serializer.toJson(data as Flux)).toBe('object');
        });
    });
});
