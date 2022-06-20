import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv-clock',
    templateUrl: './tv-clock.component.html',
    styleUrls: ['./tv-clock.component.scss'],
})
export class TvClockComponent implements OnInit {
    public time = '';

    private getTime(): void {
        const today = new Date();
        const hours = this.makeDoubleDigits(today.getHours());
        const minutes = this.makeDoubleDigits(today.getMinutes());

        this.time = `${hours}:${minutes}`;

        window.setTimeout(() => this.getTime(), 100);
    }

    private makeDoubleDigits(i: number): string {
        let j = i.toString();

        if (i < 10) {
            j = `0${i}`;
        }

        return j;
    }

    public ngOnInit(): void {
        this.getTime();
    }
}
