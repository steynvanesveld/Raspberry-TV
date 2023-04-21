import { TvRadioComponent } from './tv-radio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioService } from 'src/app/data/services/radio.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RadioServiceMock } from 'src/app/data/services/mocks/radio.service.mock';

describe('TvRadioComponent', () => {
    let component: TvRadioComponent;
    let radioService: RadioService;
    let radioServiceMock: RadioServiceMock;
    let fixture: ComponentFixture<TvRadioComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                { provide: RadioService, useClass: RadioServiceMock },
                RadioServiceMock,
            ],
            declarations: [TvRadioComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TvRadioComponent);
        radioService = TestBed.inject(RadioService);
        radioServiceMock = TestBed.inject(RadioServiceMock);
        component = fixture.componentInstance;
        component.overlay = true;
        spyOn(component, 'startRadio');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('nowPlayingChannel()', () => {
        it('should return the now playing channel', () => {
            expect(component.nowPlayingChannel).toEqual(
                component.radioService.radioChannels[
                    component.nowPlayingChannelIndex
                ]
            );
        });
    });

    describe('nowPlayingSong()', () => {
        it('should return the current song if KINK is playing', () => {
            component.nowPlaying = radioServiceMock.kinkResponse;
            expect(component.nowPlayingSong).toEqual('kink_song');
        });

        it('should return the current song if FLUX is playing', () => {
            component.nowPlaying = radioServiceMock.fluxResponse;
            expect(component.nowPlayingSong).toEqual('flux_song');
        });

        it('should return the current song if DNB is playing', () => {
            component.nowPlaying = radioServiceMock.dnbResponse;
            expect(component.nowPlayingSong).toEqual('dnb_song');
        });

        it('should return an empty string when anything else is playing', () => {
            component.nowPlaying = undefined;
            expect(component.nowPlayingSong).toEqual('');
        });
    });

    describe('nowPlayingArtist()', () => {
        it('should return the current artist if KINK is playing', () => {
            component.nowPlaying = radioServiceMock.kinkResponse;
            expect(component.nowPlayingArtist).toEqual('kink_artist');
        });

        it('should return the current artist if FLUX is playing', () => {
            component.nowPlaying = radioServiceMock.fluxResponse;
            expect(component.nowPlayingArtist).toEqual('flux_artistCredits');
        });

        it('should return the current artist if DNB is playing', () => {
            component.nowPlaying = radioServiceMock.dnbResponse;
            expect(component.nowPlayingArtist).toEqual('dnb_artist');
        });

        it('should return an empty string when anything else is playing', () => {
            component.nowPlaying = undefined;
            expect(component.nowPlayingArtist).toEqual('');
        });
    });

    describe('getNowPlaying()', () => {
        it('should call RadioService.getNowPlaying()', () => {
            spyOn(radioService, 'getNowPlaying').and.callThrough();

            component.getNowPlaying();

            expect(radioService.getNowPlaying).toHaveBeenCalled();
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

    describe('setSelectedChannel()', () => {
        it('should set selectedChannelIndex', () => {
            component.selectedChannelIndex = 0;

            component.setSelectedChannel(2);

            expect(component.selectedChannelIndex).toEqual(2);
        });

        it('should do nothing when selectedChannelIndex is smaller than 0', () => {
            component.selectedChannelIndex = 0;

            component.setSelectedChannel(-1);

            expect(component.selectedChannelIndex).toEqual(0);
        });

        it('should do nothing when selectedChannelIndex is bigger than radioChannels length', () => {
            component.selectedChannelIndex = 0;

            component.setSelectedChannel(5);

            expect(component.selectedChannelIndex).toEqual(0);
        });
    });

    describe('setNowPlayingChannel()', () => {
        it('should call startRadio()', () => {
            component.setNowPlayingChannel();

            expect(component.startRadio).toHaveBeenCalled();
        });

        it('should call getNowPlaying()', () => {
            spyOn(component, 'getNowPlaying');

            component.setNowPlayingChannel();

            expect(component.getNowPlaying).toHaveBeenCalled();
        });
    });

    describe('listenForKeyDown()', () => {
        it('should do nothing when overlay is false', () => {
            spyOn(component, 'setNowPlayingChannel').and.callThrough();

            component.overlay = false;

            component.listenForKeyDown();

            component.keyDownSubject.next('Enter');

            expect(component.setNowPlayingChannel).not.toHaveBeenCalled();
        });

        it('should call setNowPlayingChannel() on key "Enter"', () => {
            spyOn(component, 'setNowPlayingChannel').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('Enter');

            expect(component.setNowPlayingChannel).toHaveBeenCalled();
        });

        it('should call setSelectedChannel() on key "Backspace"', () => {
            spyOn(component, 'setSelectedChannel').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('Backspace');

            expect(component.setSelectedChannel).toHaveBeenCalledWith(
                component.nowPlayingChannelIndex
            );
        });

        it('should call setSelectedChannel() on key "ArrowUp"', () => {
            const newIndex = component.selectedChannelIndex - 1;
            spyOn(component, 'setSelectedChannel').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowUp');

            expect(component.setSelectedChannel).toHaveBeenCalledWith(newIndex);
        });

        it('should call setSelectedChannel() on key "ArrowDown"', () => {
            const newIndex = component.selectedChannelIndex + 1;

            spyOn(component, 'setSelectedChannel').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowDown');

            expect(component.setSelectedChannel).toHaveBeenCalledWith(newIndex);
        });
    });

    describe('ngOnInit()', () => {
        it('should call startRadio()', () => {
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
