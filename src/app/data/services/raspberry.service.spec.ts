import { TestBed } from '@angular/core/testing';
import { RaspberryService } from './raspberry.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RaspberryService', () => {
    let service: RaspberryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [RaspberryService],
        });

        service = TestBed.inject(RaspberryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getSystem()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getSystem().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(`${environment.raspberry_host}/api/system.php`);

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('getFavorites()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getFavorites().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(`${environment.raspberry_host}/api/favorites.php`);

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });

    describe('setFavorites()', () => {
        it('should make a POST request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'create').and.callThrough();

            service.setFavorite('1').subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(`${environment.raspberry_host}/api/favorites.php`);

            expect(request.request.method).toBe('POST');

            request.flush([]);
        });
    });
});
