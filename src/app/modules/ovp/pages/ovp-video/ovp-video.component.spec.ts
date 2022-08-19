import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OVPVideoComponent } from './ovp-video.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Favorites } from 'src/app/data/models/favorites.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OVPVideoService } from 'src/app/data/services/ovpvideo.service';
import { RaspberryService } from 'src/app/data/services/raspberry.service';
import {
    RaspberryServiceMock,
    favorites,
} from 'src/app/data/services/mocks/raspberry.service.mock';
import {
    OVPVideoServiceMock,
    ovpVideoMock,
} from 'src/app/data/services/mocks/ovpvideo.service.mock';

describe('OVPVideoComponent', () => {
    let component: OVPVideoComponent;
    let raspberryService: RaspberryService;
    let ovpVideoService: OVPVideoService;
    let fixture: ComponentFixture<OVPVideoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                { provide: OVPVideoService, useClass: OVPVideoServiceMock },
                { provide: RaspberryService, useClass: RaspberryServiceMock },
            ],
            declarations: [OVPVideoComponent],
        }).compileComponents();
    });

    it('should create', () => {
        fixture = TestBed.createComponent(OVPVideoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('getOVPVideo()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            ovpVideoService = TestBed.inject(OVPVideoService);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call ovpVideoService.getOVPVideo()', () => {
            const id = 'id';
            spyOn(ovpVideoService, 'getOVPVideo').and.callThrough();
            component.getOVPVideo(id);
            expect(ovpVideoService.getOVPVideo).toHaveBeenCalledWith(id);
        });

        it('should set the ovpVideo variable', () => {
            component.getFavorites();
            expect(component.ovpVideo).toEqual(ovpVideoMock);
        });
    });

    describe('getRouteData()', () => {
        it('should call getOVPVideo() when no redirect queryParam exists', () => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            spyOn(component, 'getOVPVideo').and.callThrough();

            component.getRouteData();

            expect(component.getOVPVideo).toHaveBeenCalledWith(
                undefined as unknown as string
            );
        });

        it('should call reloadPage() when redirect queryParam exists', () => {
            TestBed.overrideProvider(ActivatedRoute, {
                useValue: {
                    queryParamMap: of({
                        get(): string {
                            return 'true';
                        },
                    }),
                    params: of({
                        get(): string {
                            return 'true';
                        },
                    }),
                },
            });

            fixture = TestBed.createComponent(OVPVideoComponent);
            component = fixture.componentInstance;
            spyOn(component, 'reloadPage').and.stub();

            fixture.detectChanges();

            component.getRouteData();

            expect(component.reloadPage).toHaveBeenCalledWith(
                '/#/ovp/undefined'
            );
        });
    });

    describe('url()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should return an url encoded string', () => {
            expect(component.url('keyword, with, commas')).toEqual(
                '/#/ovp?search=keyword%2C%20with%2C%20commas'
            );
        });
    });

    describe('getFavorites()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            raspberryService = TestBed.inject(RaspberryService);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call raspberryService.getFavorites()', () => {
            spyOn(raspberryService, 'getFavorites').and.callThrough();
            component.getFavorites();
            expect(raspberryService.getFavorites).toHaveBeenCalled();
        });

        it('should set the favorites variable', () => {
            component.favorites = new Favorites([]);
            component.getFavorites();
            expect(component.favorites).toEqual(favorites);
        });
    });

    describe('setFavorite()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            raspberryService = TestBed.inject(RaspberryService);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call raspberryService.setFavorite()', () => {
            spyOn(raspberryService, 'setFavorite').and.callThrough();
            component.setFavorite(ovpVideoMock);
            expect(raspberryService.setFavorite).toHaveBeenCalledWith(
                ovpVideoMock.id
            );
        });

        it('should set the favorites variable', () => {
            component.favorites = new Favorites([]);
            component.getFavorites();
            expect(component.favorites).toEqual(favorites);
        });
    });

    describe('ngOnInit()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call getRouteData()', () => {
            spyOn(component, 'getRouteData').and.callThrough();
            component.ngOnInit();
            expect(component.getRouteData).toHaveBeenCalled();
        });

        it('should call getFavorites()', () => {
            spyOn(component, 'getFavorites').and.callThrough();
            component.ngOnInit();
            expect(component.getFavorites).toHaveBeenCalled();
        });
    });

    describe('ngOnDestroy()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPVideoComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should unsubscribe to all subscriptions', () => {
            spyOn(component.ngUnsubscribe, 'complete');
            component.ngOnDestroy();
            expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
        });
    });
});
