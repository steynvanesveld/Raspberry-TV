import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {
    private idleTimeout = 0;
    public idle = false;
    public keyDownSubject = new Subject<KeyboardEventKey>();
    public keyPressed: string | undefined;

    private setIdleTimeout(miliseconds: number): void {
        this.idle = false;
        clearTimeout(this.idleTimeout);

        this.idleTimeout = window.setTimeout(() => {
            this.idle = true;
        }, miliseconds);
    }

    private listenForKeyDown(): void {
        this.keyDownSubject.subscribe((key: KeyboardEventKey) => {
            if (key === 'Backspace') {
                document.body.classList.toggle('hidden');
            }
        });
    }

    private listenForEvents(): void {
        const miliseconds = 1000 * 5; // 5 seconds

        this.setIdleTimeout(miliseconds);

        window.addEventListener('click', () => {
            this.setIdleTimeout(miliseconds);
        });

        window.addEventListener('mousemove', () => {
            this.setIdleTimeout(miliseconds);
        });

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            this.keyDownSubject.next(event.key as KeyboardEventKey);
        });
    }

    public ngOnInit(): void {
        this.listenForEvents();
        this.listenForKeyDown();
    }
}
