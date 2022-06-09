import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrls: ['./tv-radio.component.scss'],
})
export class TvRadioComponent implements OnInit {
    @ViewChild('audio') audio: ElementRef<HTMLAudioElement> | undefined;

    public audioSrc =
        'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3';

    public ngOnInit(): void {
        this.autoPlayAudio();
    }

    public autoPlayAudio(): void {
        setTimeout(() => {
            this.audio?.nativeElement.play();
        });
    }
}
