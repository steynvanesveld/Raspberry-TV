import { TvRadioComponent } from './tv-radio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { KinkService } from 'src/app/data/services/kink.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KinkServiceMock } from 'src/app/data/services/mocks/kink.service.mock';

describe('TvRadioComponent', () => {
    let component: TvRadioComponent;
    let kinkService: KinkService;
    let fixture: ComponentFixture<TvRadioComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [{ provide: KinkService, useClass: KinkServiceMock }],
            declarations: [TvRadioComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TvRadioComponent);
        kinkService = TestBed.inject(KinkService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('currentChannel()', () => {
        it('should return the current channel', () => {
            expect(component.currentChannel).toEqual(
                component.kinkService.kinkChannels[
                    component.currentChannelIndex
                ]
            );
        });
    });

    describe('currentSong()', () => {
        it('should return the current song', () => {
            expect(component.currentSong).toEqual(
                component.kink.extended[component.currentChannel.apiName].title
            );
        });
    });

    describe('currentArtist()', () => {
        it('should return the current artist', () => {
            expect(component.currentArtist).toEqual(
                component.kink.extended[component.currentChannel.apiName].artist
            );
        });
    });

    describe('startRadio()', () => {
        it('should call kinkService.getChannel()', () => {
            spyOn(kinkService, 'getChannel').and.callThrough();

            component.startRadio();

            expect(kinkService.getChannel).toHaveBeenCalled();
        });
    });

    describe('getNowPlaying()', () => {
        it('should call kinkService.getNowPlaying()', () => {
            spyOn(kinkService, 'getNowPlaying').and.callThrough();

            component.getNowPlaying();

            expect(kinkService.getNowPlaying).toHaveBeenCalled();
        });

        it('should call itself after 30 seconds', () => {
            jasmine.clock().install();
            spyOn(component, 'getNowPlaying').and.callThrough();

            component.getNowPlaying();

            jasmine.clock().tick(1000 * 30);

            expect(component.getNowPlaying).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('setNextChannel()', () => {
        it('should increment the currentChannelIndex', () => {
            component.setNextChannel();

            expect(component.currentChannelIndex).toEqual(1);
        });

        it('should reset the currentChannelIndex to 1 when the end of the array is reached', () => {
            component.currentChannelIndex =
                component.kinkService.kinkChannels.length - 1;

            component.setNextChannel();

            expect(component.currentChannelIndex).toEqual(0);
        });

        it('should call startRadio()', () => {
            spyOn(component, 'startRadio').and.callThrough();

            component.setNextChannel();

            expect(component.startRadio).toHaveBeenCalled();
        });

        it('should call getNowPlaying()', () => {
            spyOn(component, 'getNowPlaying').and.callThrough();

            component.setNextChannel();

            expect(component.getNowPlaying).toHaveBeenCalled();
        });
    });

    describe('listenForKeyDown()', () => {
        it('should call setNextChannel() on key "Enter"', () => {
            spyOn(component, 'setNextChannel').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('Enter');

            expect(component.setNextChannel).toHaveBeenCalled();
        });
    });

    describe('ngOnInit()', () => {
        it('should call startRadio()', () => {
            spyOn(component, 'startRadio').and.callThrough();
            component.ngOnInit();
            expect(component.startRadio).toHaveBeenCalled();
        });

        it('should call getNowPlaying()', () => {
            spyOn(component, 'getNowPlaying').and.callThrough();
            component.ngOnInit();
            expect(component.getNowPlaying).toHaveBeenCalled();
        });

        it('should call listenForKeyDown()', () => {
            spyOn(component, 'listenForKeyDown').and.callThrough();
            component.ngOnInit();
            expect(component.listenForKeyDown).toHaveBeenCalled();
        });
    });

    describe('ngOnDestroy()', () => {
        it('should unsubscribe to all subscriptions', () => {
            spyOn(component.ngUnsubscribe, 'complete');
            component.ngOnDestroy();
            expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
        });
    });
});
