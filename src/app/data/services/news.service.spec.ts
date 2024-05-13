import { NewsService } from './news.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NewsService', () => {
    let service: NewsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NewsService],
        });

        service = TestBed.inject(NewsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getNewsItem()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getNewsItem('link').subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne('https://proxy.cors.sh/link');

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getEasterEggNews()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getEasterEggNews().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://proxy.cors.sh/http://192.168.178.2/assets/easterEgg/news.xml',
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getNos()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getNos().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://proxy.cors.sh/http://feeds.nos.nl/nosnieuwsalgemeen?format=xml',
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getHoogeveenscheCourant()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getHoogeveenscheCourant().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://proxy.cors.sh/https://hoogeveenschecourant.nl/api/feed/rss',
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getRTVDrenthe()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getRTVDrenthe().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://proxy.cors.sh/https://www.rtvdrenthe.nl/rss/index.xml',
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });
});
