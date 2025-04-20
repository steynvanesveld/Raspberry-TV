import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv-clock',
    templateUrl: './tv-clock.component.html',
    styleUrl: './tv-clock.component.scss',
})
export class TvClockComponent implements OnInit {
    public date = '';
    public time = '';

    public getDateTime(): void {
        const today = new Date();

        this.date = today.toLocaleString('nl-NL', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });

        this.time = today.toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        setTimeout(() => this.getDateTime(), 100);
    }

    public ngOnInit(): void {
        this.getDateTime();
    }
}
