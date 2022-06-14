import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {
    public idle = false;
    private idleTimeout: number | undefined;

    public ngOnInit(): void {
        this.listenForEvents();
    }

    public listenForEvents(): void {
        const miliseconds = 1000 * 5; // 5 seconds

        this.setTimer(miliseconds);

        window.addEventListener('click', () => {
            this.setTimer(miliseconds);
        });

        window.addEventListener('mousemove', () => {
            console.log('move');
            this.setTimer(miliseconds);
        });
    }

    private setTimer(miliseconds: number): void {
        this.idle = false;
        clearTimeout(this.idleTimeout);

        this.idleTimeout = window.setTimeout(() => {
            this.idle = true;
        }, miliseconds);
    }
}
