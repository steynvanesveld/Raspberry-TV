import { interval, Subject } from 'rxjs';
import { DNB } from '@data/models/dnb.model';
import { Kink } from '@data/models/kink.model';
import { Flux } from '@data/models/flux.model';
import { CommonModule } from '@angular/common';
import { RadioService } from '@data/services/radio.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RadioChannel } from '@data/models/radio-channel.model';
import { KeyboardEventKey } from '@data/models/keyboard-event-key.type';
import { TvNpmfeedComponent } from '../tv-npmfeed/tv-npmfeed.component';
import { Component, DestroyRef, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrl: './tv-radio.component.scss',
    imports: [CommonModule, TvNpmfeedComponent],
})
export class TvRadioComponent implements OnInit {
    @Input() public keyDownSubject = new Subject<KeyboardEventKey>();
    @Input() public overlay!: boolean;

    @ViewChild('radioElement')
    public radioElement!: ElementRef<HTMLAudioElement>;

    public destroyRef = inject(DestroyRef);
    public nowPlaying: Kink | Flux | DNB | undefined = undefined;
    public nowPlayingChannelIndex = 0;
    public selectedChannelIndex = 0;

    constructor(public radioService: RadioService) {}

    public get nowPlayingChannel(): RadioChannel {
        return this.radioService.radioChannels[this.nowPlayingChannelIndex];
    }

    public get nowPlayingSong(): string {
        if (this.nowPlaying instanceof Kink) {
            return this.nowPlaying.extended[this.nowPlayingChannel.apiRef].title;
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
            return this.nowPlaying.extended[this.nowPlayingChannel.apiRef].artist;
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
        }, 1);
    }

    public getNowPlaying(): void {
        this.radioService
            .getNowPlaying(this.nowPlayingChannel)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.nowPlaying = response;
            });
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

        interval(1000 * 30) // 30 seconds
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.getNowPlaying());
    }
}
