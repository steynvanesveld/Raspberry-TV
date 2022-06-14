import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrls: ['./tv-radio.component.scss'],
})
export class TvRadioComponent implements AfterViewInit {
    @ViewChild('radio') radio!: ElementRef<HTMLAudioElement>;

    constructor() {}

    public ngAfterViewInit(): void {
        this.startRadio();
    }

    public startRadio(): void {
        this.radio.nativeElement.src =
            'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3';
        this.radio.nativeElement.volume = 0.5;
        this.radio.nativeElement.play();
    }
}
