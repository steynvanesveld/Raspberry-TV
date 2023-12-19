import { Photos } from 'src/app/data/models/photos.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PexelsService } from 'src/app/data/services/pexels.service';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';

@Component({
    selector: 'app-tv-wallpaper',
    templateUrl: './tv-wallpaper.component.html',
    styleUrls: ['./tv-wallpaper.component.scss'],
})
export class TvWallpaperComponent implements OnInit {
    @Input() public idle!: boolean;
    @Input() public hidden!: boolean;
    @Input() public overlay!: boolean;

    public dayIndex = 0;
    public destroyRef = inject(DestroyRef);
    public photos: Photos | undefined;
    private photoParameters = '?auto=compress&fit=crop&w=1920&h=1080';
    private gradient =
        'linear-gradient(to bottom, rgba(81, 68, 33, 0.75), rgba(0, 0, 0, 0.75))';

    constructor(private pexelsService: PexelsService) {}

    public get currentBackgroundImage(): string {
        let url = '';

        if (this.photos?.photos.length) {
            const photo = this.photos.photos[this.dayIndex].src.original;
            url = `, url('${photo}${this.photoParameters}')`;
        }

        return this.gradient + url;
    }

    public getPhotos(): void {
        const season = ['winter', 'spring', 'summer', 'autumn'][
            Math.floor((new Date().getMonth() / 12) * 4) % 4
        ];

        this.pexelsService
            .getPhotos(`${season} nature forest wallpaper`)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.photos = result;
            });

        setTimeout(() => {
            this.getPhotos();
        }, 1000 * 60 * 24 * 7); // 1 week
    }

    public setCurrentDay(): void {
        const today = new Date();
        this.dayIndex = today.getDate();

        setTimeout(() => {
            this.setCurrentDay();
        }, 1000 * 60 * 6); // 6 hours
    }

    public ngOnInit(): void {
        this.getPhotos();
        this.setCurrentDay();
    }
}
