import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { OVPComponent } from './ovp.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OVPService } from 'src/app/data/services/ovp.service';
import { Favorites } from 'src/app/data/models/favorites.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OVPVideoService } from 'src/app/data/services/ovpvideo.service';
import { RaspberryService } from 'src/app/data/services/raspberry.service';
import { OVPServiceMock } from 'src/app/data/services/mocks/ovp.service.mock';
import {
    favorites,
    RaspberryServiceMock,
} from 'src/app/data/services/mocks/raspberry.service.mock';
import {
    ovpVideoMock,
    OVPVideoServiceMock,
} from 'src/app/data/services/mocks/ovpvideo.service.mock';

describe('OVPComponent', () => {
    let ovpService: OVPService;
    let component: OVPComponent;
    let ovpVideoService: OVPVideoService;
    let raspberryService: RaspberryService;
    let fixture: ComponentFixture<OVPComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: OVPService, useClass: OVPServiceMock },
                { provide: OVPVideoService, useClass: OVPVideoServiceMock },
                { provide: RaspberryService, useClass: RaspberryServiceMock },
            ],
            declarations: [OVPComponent],
        }).compileComponents();
    });

    it('should create', () => {
        fixture = TestBed.createComponent(OVPComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    describe('routerNavigate()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should  blur target', () => {
            const event = {
                target: { blur: () => {} },
            } as unknown as Event;

            spyOn(event.target as HTMLElement, 'blur');

            component.routerNavigate(event);

            expect((event.target as HTMLElement).blur).toHaveBeenCalled();
        });

        it('should navigate to current page with queryParams', () => {
            spyOn(component.router, 'navigate').and.resolveTo();

            component.routerNavigate();

            expect(component.router.navigate).toHaveBeenCalledWith([], {
                relativeTo: component.activatedRoute,
                queryParams: {
                    order: component.order,
                    page: component.page,
                    search: component.query,
                    showFavorites: component.showFavorites,
                    orientation: component.orientation,
                },
                queryParamsHandling: 'merge',
            });
        });
    });

    describe('searchOVP()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            ovpService = TestBed.inject(OVPService);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call ovpService.searchOVP()', () => {
            spyOn(ovpService, 'searchOVP').and.callThrough();
            component.searchOVP('order', 0, 'query');
            expect(ovpService.searchOVP).toHaveBeenCalledWith(
                'order',
                0,
                'query',
            );
        });

        it('should call getFavorites()', () => {
            spyOn(component, 'getFavorites').and.callThrough();
            component.searchOVP('order', 0, 'query');
            expect(component.getFavorites).toHaveBeenCalled();
        });
    });

    describe('setNewThumbnail()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should set the next thumb as current_thumb', () => {
            const video = component.ovp.videos[0];
            video.current_thumb.src = 'test';

            expect(video.current_thumb).toEqual(video.thumbs[0]);
        });

        it('should call itself after 750 milliseconds', () => {
            const video = component.ovp.videos[0];
            jasmine.clock().install();
            spyOn(component, 'setNewThumbnail').and.callThrough();

            component.setNewThumbnail(video);

            jasmine.clock().tick(1500);

            expect(component.setNewThumbnail).toHaveBeenCalledTimes(3);

            jasmine.clock().uninstall();
        });
    });

    describe('setDefaultThumbnail()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should set the current_thumb back to default_thumb', () => {
            const video = component.ovp.videos[0];
            video.current_thumb.src = 'test';
            component.setDefaultThumbnail(video);
            expect(video.current_thumb).toEqual(video.default_thumb);
        });
    });

    describe('listenForSearchChange()', () => {
        it('should set the variables to the fallback if no queryParams are present', () => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            component.listenForSearchChange();

            expect(component.order).toEqual('top-weekly');
            expect(component.page).toEqual(1);
            expect(component.query).toEqual(null);
            expect(component.showFavorites).toEqual(false);
            expect(component.orientation).toEqual('landscape');
        });

        it('should set the orientation variable to the fallback if no queryParams are present on Android ', () => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            spyOnProperty(window.navigator, 'userAgent').and.returnValue(
                'Android',
            );
            fixture.detectChanges();

            component.listenForSearchChange();

            expect(component.orientation).toEqual('portrait');
        });

        it('should set the variables to the queryParam', () => {
            TestBed.overrideProvider(ActivatedRoute, {
                useValue: {
                    queryParamMap: of({
                        get(): string {
                            return 'true';
                        },
                    }),
                },
            });

            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();

            component.listenForSearchChange();

            expect(component.order).toEqual('true');
            expect(component.page).toEqual(NaN);
            expect(component.query).toEqual('true');
            expect(component.showFavorites).toEqual(true);
            expect(component.orientation).toEqual('true');
        });

        it('should set the orientation to the queryParam on Android', () => {
            TestBed.overrideProvider(ActivatedRoute, {
                useValue: {
                    queryParamMap: of({
                        get(): string {
                            return 'true';
                        },
                    }),
                },
            });

            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            spyOnProperty(window.navigator, 'userAgent').and.returnValue(
                'Android',
            );
            fixture.detectChanges();

            component.listenForSearchChange();

            expect(component.orientation).toEqual('true');
        });
    });

    describe('getFavorites()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
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

    describe('getFavoriteVideos()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            ovpVideoService = TestBed.inject(OVPVideoService);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should do nothing if showFavorites is false', () => {
            spyOn(ovpVideoService, 'getOVPVideo');
            component.getFavoriteVideos();
            expect(ovpVideoService.getOVPVideo).not.toHaveBeenCalled();
        });

        it('should loop through favorites and get detailed info', () => {
            component.showFavorites = true;

            spyOn(ovpVideoService, 'getOVPVideo').and.callThrough();
            component.getFavoriteVideos();

            expect(ovpVideoService.getOVPVideo).toHaveBeenCalledTimes(2);
        });

        it('should set the favoriteVideos variable', () => {
            component.showFavorites = true;
            component.favoriteVideos = [];

            component.getFavoriteVideos();

            expect(component.favoriteVideos).not.toEqual([]);
        });
    });

    describe('setFavorite()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            raspberryService = TestBed.inject(RaspberryService);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call raspberryService.setFavorite()', () => {
            spyOn(raspberryService, 'setFavorite').and.callThrough();
            component.setFavorite(new Event('click'), ovpVideoMock);
            expect(raspberryService.setFavorite).toHaveBeenCalledWith(
                ovpVideoMock.id,
            );
        });

        it('should set the favorites variable', () => {
            component.favorites = new Favorites([]);
            component.getFavorites();
            expect(component.favorites).toEqual(favorites);
        });
    });

    describe('showFavoriteButton()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should remove hidden class from parent', () => {
            const target = {
                parentElement: {
                    parentElement: { classList: { remove: () => {} } },
                },
            } as any;

            spyOn(target.parentElement.parentElement.classList, 'remove');

            component.showFavoriteButton(target);

            expect(
                target.parentElement.parentElement.classList.remove,
            ).toHaveBeenCalledWith('hidden');
        });
    });

    describe('ngOnInit()', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(OVPComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should call listenForSearchChange()', () => {
            spyOn(component, 'listenForSearchChange').and.callThrough();
            component.ngOnInit();
            expect(component.listenForSearchChange).toHaveBeenCalled();
        });
    });
});
