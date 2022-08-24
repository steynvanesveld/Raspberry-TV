import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Kink } from 'src/app/data/models/kink.model';
import { HttpErrorResponse } from '@angular/common/http';
import { KinkService } from 'src/app/data/services/kink.service';
import { KinkChannel } from 'src/app/data/models/kink-channel.model';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';
import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrls: ['./tv-radio.component.scss'],
})
export class TvRadioComponent implements OnInit, OnDestroy {
    @Input() public keyDownSubject = new Subject<KeyboardEventKey>();

    @ViewChild('radio') public radio!: ElementRef<HTMLAudioElement>;

    public kink!: Kink;
    public ngUnsubscribe = new Subject<void>();
    public getNowPlayingTimeout!: number;
    public currentChannelIndex = 0;

    constructor(public kinkService: KinkService) {}

    public get currentChannel(): KinkChannel {
        return this.kinkService.kinkChannels[this.currentChannelIndex];
    }

    public get currentSong(): string {
        return this.kink.extended[this.currentChannel.apiName].title;
    }

    public get currentArtist(): string {
        return this.kink.extended[this.currentChannel.apiName].artist;
    }

    /* istanbul ignore next */
    public startRadio(): void {
        setTimeout(() => {
            this.radio.nativeElement.src =
                this.kinkService.fileUrl +
                this.currentChannel.fileName +
                this.kinkService.fileFormat;
            this.radio.nativeElement.volume = 0.5;
            this.radio.nativeElement.play();
        });
    }

    public getNowPlaying() {
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

    public setNextChannel(): void {
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

    public listenForKeyDown(): void {
        this.keyDownSubject
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((key: KeyboardEventKey) => {
                if (key === 'Enter') {
                    this.setNextChannel();
                }
            });
    }

    public ngOnInit(): void {
        this.startRadio();
        this.getNowPlaying();
        this.listenForKeyDown();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
