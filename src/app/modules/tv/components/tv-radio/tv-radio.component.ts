import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv-radio',
    templateUrl: './tv-radio.component.html',
    styleUrls: ['./tv-radio.component.scss'],
})
export class TvRadioComponent implements OnInit {
    public radio_url = 'http://22593.live.streamtheworld.com/KINK.mp3';
    public ngOnInit(): void {}
}
