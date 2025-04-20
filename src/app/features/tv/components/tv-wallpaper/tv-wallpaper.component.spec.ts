import { provideHttpClient } from '@angular/common/http';
import { PexelsService } from '@data/services/pexels.service';
import { TvWallpaperComponent } from './tv-wallpaper.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PexelsServiceMock } from '@data/services/mocks/pexels.service.mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('TvWallpaperComponent', () => {
    let component: TvWallpaperComponent;
    let fixture: ComponentFixture<TvWallpaperComponent>;
    let pexelsService: PexelsService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TvWallpaperComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: PexelsService, useClass: PexelsServiceMock },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TvWallpaperComponent);
        pexelsService = TestBed.inject(PexelsService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('currentBackgroundImage()', () => {
        it('should return todays photo with a gradient overlay', () => {
            expect(component.currentBackgroundImage).toEqual(
                "linear-gradient(to bottom, rgba(81, 68, 33, 0.75), rgba(0, 0, 0, 0.75)), url('original.jpg?auto=compress&fit=crop&w=1920&h=1080')",
            );
        });

        it('should only return the gradient when the photos are undefined', () => {
            component.photos = undefined;

            expect(component.currentBackgroundImage).toEqual(
                'linear-gradient(to bottom, rgba(81, 68, 33, 0.75), rgba(0, 0, 0, 0.75))',
            );
        });
    });

    describe('getPhotos()', () => {
        it('should call pexelsService.getPhotos()', () => {
            const season = ['winter', 'spring', 'summer', 'autumn'][
                Math.floor((new Date().getMonth() / 12) * 4) % 4
            ];

            spyOn(pexelsService, 'getPhotos').and.callThrough();

            component.getPhotos();

            expect(pexelsService.getPhotos).toHaveBeenCalledWith(
                `${season} nature forest wallpaper`,
            );
        });

        it('should call itself after 1 week', () => {
            jasmine.clock().install();
            spyOn(component, 'getPhotos').and.callThrough();

            component.getPhotos();

            jasmine.clock().tick(1000 * 60 * 24 * 7);

            expect(component.getPhotos).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('setCurrentDay()', () => {
        it('should set the dayIndex variable', () => {
            const testIndex = new Date().getDate();

            component.setCurrentDay();

            expect(component.dayIndex).toEqual(testIndex);
        });

        it('should call itself after 6 hours', () => {
            jasmine.clock().install();
            spyOn(component, 'setCurrentDay').and.callThrough();

            component.setCurrentDay();

            jasmine.clock().tick(1000 * 60 * 6);

            expect(component.setCurrentDay).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('ngOnInit()', () => {
        it('should call getPhotos()', () => {
            spyOn(component, 'getPhotos').and.callThrough();
            component.ngOnInit();
            expect(component.getPhotos).toHaveBeenCalled();
        });

        it('should call setCurrentDay()', () => {
            spyOn(component, 'setCurrentDay').and.callThrough();
            component.ngOnInit();
            expect(component.setCurrentDay).toHaveBeenCalled();
        });
    });
});
