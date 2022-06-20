import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Kink } from 'src/app/data/models/kink.model';
import { KinkService } from 'src/app/data/services/kink.service';
import { KinkChannel } from 'src/app/data/models/kink-channel.model';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrls: ['./tv-radio.component.scss'],
})
export class TvRadioComponent implements AfterViewInit, OnDestroy {
    @Input() public keyDownSubject = new Subject<KeyboardEvent>();

    @ViewChild('radio') private radio!: ElementRef<HTMLAudioElement>;

    public kink!: Kink;
    public ngUnsubscribe = new Subject<void>();
    public doubleKeyDownTimeout!: number;
    public getNowPlayingTimeout!: number;
    public currentChannelIndex = 0;

    constructor(public kinkService: KinkService) {}

    public get currentChannel(): KinkChannel {
        return this.kinkService.kinkChannels[this.currentChannelIndex];
    }

    public get currentChannelName(): string {
        return this.currentChannel.name.replace(' ', '-').toLowerCase();
    }

    public get currentSong(): string {
        return this.kink.extended[this.currentChannelName].title;
    }

    public get currentArtist(): string {
        return this.kink.extended[this.currentChannelName].artist;
    }

    private startRadio(): void {
        this.radio.nativeElement.src = this.currentChannel.url;
        this.radio.nativeElement.volume = 0.5;
        this.radio.nativeElement.play();
    }

    private getNowPlaying() {
        clearTimeout(this.getNowPlayingTimeout);

        this.kinkService
            .getNowPlaying()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.kink = response;
            });

        this.getNowPlayingTimeout = window.setTimeout(() => {
            this.getNowPlaying();
        }, 1000 * 30); // 30 seconds
    }

    private setNextChannel(): void {
        if (
            this.currentChannelIndex + 1 ===
            this.kinkService.kinkChannels.length
        ) {
            this.currentChannelIndex = 0;
        } else {
            this.currentChannelIndex = this.currentChannelIndex + 1;
        }

        this.startRadio();
        this.getNowPlaying();
    }

    private listenForKeyDown(): void {
        this.keyDownSubject.subscribe((event: KeyboardEvent) => {
            clearTimeout(this.doubleKeyDownTimeout);

            this.doubleKeyDownTimeout = window.setTimeout(() => {
                if (event.key === 'Enter') {
                    this.setNextChannel();
                }
            }, 250);
        });
    }

    public ngAfterViewInit(): void {
        this.startRadio();
        this.getNowPlaying();
        this.listenForKeyDown();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
