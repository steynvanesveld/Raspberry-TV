import { TestBed } from '@angular/core/testing';
import { OVPVideoService } from './ovpvideo.service';
import { environment } from 'src/environments/environment';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

describe('OVPVideoService', () => {
    let service: OVPVideoService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OVPVideoService],
        });

        service = TestBed.inject(OVPVideoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getOVPVideo()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getOVPVideo('id').subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                `${environment.ovp_api_url}/id/?id=id&thumbsize=big`,
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });
});
