import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Kink } from 'src/app/data/models/kink.model';
import { KinkService } from 'src/app/data/services/kink.service';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrls: ['./tv-radio.component.scss'],
})
export class TvRadioComponent implements AfterViewInit, OnDestroy {
    @ViewChild('radio') private radio!: ElementRef<HTMLAudioElement>;

    public kink!: Kink;
    public ngUnsubscribe = new Subject<void>();

    constructor(private kinkService: KinkService) {}

    private startRadio(): void {
        this.radio.nativeElement.src = this.kinkService.audioSrc;
        this.radio.nativeElement.volume = 0.5;
        this.radio.nativeElement.play();
    }

    private getNowPlaying() {
        this.kinkService
            .getNowPlaying()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.kink = response;
            });

        setTimeout(() => {
            this.getNowPlaying();
        }, 1000 * 30); // 30 seconds
    }

    public ngAfterViewInit(): void {
        this.startRadio();
        this.getNowPlaying();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
