import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {
    private idleTimeout!: number;
    public idle = false;
    public keyDownSubject = new Subject<KeyboardEvent>();

    private setTimer(miliseconds: number): void {
        this.idle = false;
        clearTimeout(this.idleTimeout);

        this.idleTimeout = window.setTimeout(() => {
            this.idle = true;
        }, miliseconds);
    }

    private listenForEvents(): void {
        const miliseconds = 1000 * 5; // 5 seconds

        this.setTimer(miliseconds);

        window.addEventListener('click', () => {
            this.setTimer(miliseconds);
        });

        window.addEventListener('mousemove', () => {
            this.setTimer(miliseconds);
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keyDownSubject.next(event);
        });
    }

    public ngOnInit(): void {
        this.listenForEvents();
    }
}
