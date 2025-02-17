import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { KeyboardEventKey } from '@data/models/keyboard-event-key.type';
@Component({
    standalone: false,
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrl: './tv.component.scss',
})
export class TvComponent implements OnInit {
    private idleTimeout = 0;
    public idle = false;
    public keyDownSubject = new Subject<KeyboardEventKey>();
    public keyPressed: string | undefined;
    public destroyRef = inject(DestroyRef);
    public showCamera = false;
    public hidden = false;
    public overlay = false;

    constructor() {}

    public toggleAppVisibility(): void {
        if (this.overlay) {
            this.toggleOverlayVisibility();
            return;
        }
        this.hidden = !this.hidden;
    }

    public toggleOverlayVisibility(): void {
        this.overlay = !this.overlay;
    }

    public setIdleTimeout(miliseconds: number): void {
        this.idle = false;
        clearTimeout(this.idleTimeout);

        this.idleTimeout = window.setTimeout(() => {
            this.idle = true;
        }, miliseconds);
    }

    public listenForKeyDown(): void {
        this.keyDownSubject
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((key: KeyboardEventKey) => {
                if (key === 'Backspace') {
                    this.toggleAppVisibility();
                }

                if (key === 'Enter') {
                    this.toggleOverlayVisibility();
                }
            });
    }

    public listenForEvents(): void {
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
