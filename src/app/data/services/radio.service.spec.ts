import { Observable } from 'rxjs';
import { RadioService } from './radio.service';
import { TestBed } from '@angular/core/testing';
import { RadioChannel } from '../models/radio-channel.model';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

describe('RadioService', () => {
    let service: RadioService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RadioService],
        });

        service = TestBed.inject(RadioService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getNowPlaying()', () => {
        it('should return an observable', () => {
            const radioChannel = service.radioChannels.find(
                (channel) => channel.apiSrc === 'NONE'
            ) as unknown as RadioChannel;

            expect(service.getNowPlaying(radioChannel)).toEqual(
                new Observable()
            );
        });
    });

    describe('getNowPlayingKink()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            const radioChannel = service.radioChannels.find(
                (channel) => channel.apiSrc === 'KINK'
            ) as unknown as RadioChannel;

            service.getNowPlaying(radioChannel).subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://api.kink.nl/static/now-playing.json'
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getNowPlayingFlux()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            const radioChannel = service.radioChannels.find(
                (channel) => channel.apiSrc === 'FLUX'
            ) as unknown as RadioChannel;

            service.getNowPlaying(radioChannel).subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://fluxmusic.api.radiosphere.io/channels/4885aa15-eecb-49ed-9958-106ce4c95191/current-track'
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getNowPlayingDNB()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            const radioChannel = service.radioChannels.find(
                (channel) => channel.apiSrc === 'DNB'
            ) as unknown as RadioChannel;

            service.getNowPlaying(radioChannel).subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://api.dnbradio.nl/now_playing'
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });
});
