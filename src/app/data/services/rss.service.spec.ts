import { RssService } from './rss.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('RssService', () => {
    let service: RssService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(RssService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('catchError()', () => {
        it('should call serializer.fromJson()', () => {
            spyOn(service.serializer, 'fromJson' as never);
            const error = new HttpErrorResponse({ error: { text: '' } });

            service.catchError(error).subscribe(() => {
                expect(service.serializer.fromJson).toHaveBeenCalled();
            });
        });
    });
});
