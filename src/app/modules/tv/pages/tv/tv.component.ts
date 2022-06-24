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
    public multiKeyDownTimeout!: number;

    private setTimer(miliseconds: number): void {
        this.idle = false;
        clearTimeout(this.idleTimeout);

        this.idleTimeout = window.setTimeout(() => {
            this.idle = true;
        }, miliseconds);
    }

    private listenForKeyDown(): void {
        this.keyDownSubject.subscribe((event: KeyboardEvent) => {
            if (event.key === 'Backspace') {
                document.body.classList.toggle('hidden');
            }
        });
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
            clearTimeout(this.multiKeyDownTimeout);

            this.multiKeyDownTimeout = window.setTimeout(() => {
                this.keyDownSubject.next(event);
            }, 250);
        });
    }

    public ngOnInit(): void {
        this.listenForEvents();
        this.listenForKeyDown();
    }
}
