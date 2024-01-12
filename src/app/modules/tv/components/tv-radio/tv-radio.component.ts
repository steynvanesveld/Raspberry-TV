import { Subject } from 'rxjs';
import { DNB } from 'src/app/data/models/dnb.model';
import { Kink } from 'src/app/data/models/kink.model';
import { Flux } from 'src/app/data/models/flux.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RadioService } from 'src/app/data/services/radio.service';
import { RadioChannel } from 'src/app/data/models/radio-channel.model';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';
import {
    Component,
    DestroyRef,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrl: './tv-radio.component.scss',
})
export class TvRadioComponent implements OnInit {
    @Input() public keyDownSubject = new Subject<KeyboardEventKey>();
    @Input() public overlay!: boolean;

    @ViewChild('radioElement')
    public radioElement!: ElementRef<HTMLAudioElement>;

    public destroyRef = inject(DestroyRef);
    public nowPlaying: Kink | Flux | DNB | undefined = undefined;
    public nowPlayingChannelIndex = 0;
    public getNowPlayingTimeout!: number;
    public selectedChannelIndex = 0;

    constructor(public radioService: RadioService) {}

    public get nowPlayingChannel(): RadioChannel {
        return this.radioService.radioChannels[this.nowPlayingChannelIndex];
    }

    public get nowPlayingSong(): string {
        if (this.nowPlaying instanceof Kink) {
            return this.nowPlaying.extended[this.nowPlayingChannel.apiRef]
                .title;
        }

        if (this.nowPlaying instanceof Flux) {
            return this.nowPlaying.trackInfo.title;
        }

        if (this.nowPlaying instanceof DNB) {
            return this.nowPlaying.title;
        }

        return '';
    }

    public get nowPlayingArtist(): string {
        if (this.nowPlaying instanceof Kink) {
            return this.nowPlaying.extended[this.nowPlayingChannel.apiRef]
                .artist;
        }

        if (this.nowPlaying instanceof Flux) {
            return this.nowPlaying.trackInfo.artistCredits;
        }

        if (this.nowPlaying instanceof DNB) {
            return this.nowPlaying.artist;
        }

        return '';
    }

    /* istanbul ignore next */
    public startRadio(): void {
        setTimeout(() => {
            this.radioElement.nativeElement.src = this.nowPlayingChannel.file;
            this.radioElement.nativeElement.volume = 0.5;
            this.radioElement.nativeElement.play();
        });
    }

    public getNowPlaying() {
        clearTimeout(this.getNowPlayingTimeout);

        this.radioService
            .getNowPlaying(this.nowPlayingChannel)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.nowPlaying = response;
            });

        this.getNowPlayingTimeout = window.setTimeout(() => {
            this.getNowPlaying();
        }, 1000 * 30); // 30 seconds
    }

    public setSelectedChannel(selectedChannelIndex: number): void {
        if (
            selectedChannelIndex >= this.radioService.radioChannels.length ||
            selectedChannelIndex < 0
        ) {
            return;
        }

        this.selectedChannelIndex = selectedChannelIndex;
    }

    public setNowPlayingChannel(): void {
        this.nowPlaying = undefined;
        this.nowPlayingChannelIndex = this.selectedChannelIndex;
        this.startRadio();
        this.getNowPlaying();
    }

    public listenForKeyDown(): void {
        this.keyDownSubject
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((key: KeyboardEventKey) => {
                if (!this.overlay) {
                    return;
                }

                if (key === 'Enter') {
                    this.setNowPlayingChannel();
                }

                if (key === 'Backspace') {
                    this.setSelectedChannel(this.nowPlayingChannelIndex);
                }

                if (key === 'ArrowUp') {
                    this.setSelectedChannel(this.selectedChannelIndex - 1);
                }

                if (key === 'ArrowDown') {
                    this.setSelectedChannel(this.selectedChannelIndex + 1);
                }
            });
    }

    public ngOnInit(): void {
        this.startRadio();
        this.getNowPlaying();
        this.listenForKeyDown();
    }
}
