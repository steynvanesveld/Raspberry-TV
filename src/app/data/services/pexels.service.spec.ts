import { TestBed } from '@angular/core/testing';
import { PexelsService } from './pexels.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('PexelsService', () => {
    let service: PexelsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(PexelsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getPhotos()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getPhotos('query').subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                'https://api.pexels.com/v1/search?query=query&orientation=landscape&per_page=60&size=large',
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });
});
