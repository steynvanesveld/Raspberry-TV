import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit, OnDestroy {
    private idleTimeout = 0;
    public idle = false;
    public keyDownSubject = new Subject<KeyboardEventKey>();
    public keyPressed: string | undefined;
    public ngUnsubscribe = new Subject<void>();
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
            .pipe(takeUntil(this.ngUnsubscribe))
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

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
