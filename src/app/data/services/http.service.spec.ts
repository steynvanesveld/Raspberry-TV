import { HttpService } from './http.service';
import { TestBed } from '@angular/core/testing';
import { AbstractModel } from '../models/abstract.model';
import { PhotosSerializer } from '../serializers/photos.serializer';
import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('HttpService', () => {
    let service: HttpService<AbstractModel>;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: 'url',
                    useValue: 'http://localhost:8080',
                },
                {
                    provide: 'resource',
                    useValue: 'config',
                },
                {
                    provide: 'serializer',
                    useValue: PhotosSerializer,
                },
            ],
        });

        service = TestBed.inject(HttpService);
        httpMock = TestBed.inject(HttpTestingController);

        service.baseUrl = 'localhost:8080/';
        service.resource = 'resource/';
        service.serializer = new PhotosSerializer();
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('read()', () => {
        it('should call catchError() on bad call', () => {
            spyOn(service, 'catchError').and.callThrough();

            service.read().subscribe({
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                error: (err) => (err = undefined),
            });

            httpMock.expectOne(service.baseUrl + service.resource).flush('', {
                status: 400,
                statusText: 'Bad Request',
            });

            expect(service.catchError).toHaveBeenCalled();
        });
    });

    describe('setBaseUrl()', () => {
        it('should set the base url property', () => {
            service.setBaseUrl('http://localhost');
            expect(service.baseUrl).toEqual('http://localhost');
        });
    });

    describe('setResource()', () => {
        it('should set the resource property', () => {
            service.setResource('photos');
            expect(service.resource).toEqual('photos');
        });
    });

    describe('setHeaders()', () => {
        it('should set the headers property', () => {
            service.setHeaders(
                new HttpHeaders({
                    foo: 'bar',
                }),
            );
            expect(service.headers).toEqual(jasmine.any(HttpHeaders));
        });
    });

    describe('setParams()', () => {
        it('should set the params property', () => {
            service.setParams({
                key: 'value',
            });
            expect(service.params).toEqual(jasmine.any(Object));
        });
    });

    describe('setSerializer()', () => {
        it('should set the serializer property', () => {
            service.setSerializer(new PhotosSerializer());
            expect(service.serializer).toEqual(jasmine.any(PhotosSerializer));
        });
    });
});
