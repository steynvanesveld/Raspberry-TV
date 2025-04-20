import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { KeyboardEventKey } from '@data/models/keyboard-event-key.type';
import { TvNewsComponent } from '@features/tv/components/tv-news/tv-news.component';
import { TvRadioComponent } from '@features/tv/components/tv-radio/tv-radio.component';
import { TvClockComponent } from '@features/tv/components/tv-clock/tv-clock.component';
import { TvWeatherComponent } from '@features/tv/components/tv-weather/tv-weather.component';
import { TvWallpaperComponent } from '@features/tv/components/tv-wallpaper/tv-wallpaper.component';
@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrl: './tv.component.scss',
    imports: [
        CommonModule,
        TvWallpaperComponent,
        TvNewsComponent,
        TvRadioComponent,
        TvWeatherComponent,
        TvClockComponent,
    ],
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
