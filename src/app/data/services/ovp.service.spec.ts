import { OVPService } from './ovp.service';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

describe('OVPService', () => {
    let service: OVPService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OVPService],
        });

        service = TestBed.inject(OVPService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('searchOVP()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.searchOVP('order', 1, 'query').subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            let query =
                '?query=query&per_page=500&page=1&thumbsize=big&order=order';

            Object.entries(environment.ovp_api_params).forEach((param) => {
                query += `&${param[0]}=${param[1]}`;
            });

            const request = httpMock.expectOne(
                `${environment.ovp_api_url}/search/${query}`
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });
});
