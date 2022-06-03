import { Component, OnInit } from '@angular/core';
import { Photos } from 'src/app/data/models/photos.model';
import { PexelsService } from 'src/app/data/services/pexels.service';

@Component({
    selector: 'app-tv-wallpaper',
    templateUrl: './tv-wallpaper.component.html',
    styleUrls: ['./tv-wallpaper.component.scss'],
})
export class TvWallpaperComponent implements OnInit {
    public photos: Photos | undefined;
    public currentPhotoIndex = 0;
    public nextPhotoIndex = 1;
    private backgroundInterval: any;

    constructor(private pexelsService: PexelsService) {}

    get currentBackgroundImage() {
        const gradient =
            'linear-gradient(to bottom, rgba(162, 124, 91, 0.75), rgba(0, 0, 0, 0.75))';
        let url = '';

        if (this.photos?.photos.length) {
            const photo =
                this.photos.photos[this.currentPhotoIndex].src.original;
            url = `url('${photo}?auto=compress&fit=crop&w=1920&h=1080')`;
        }

        return `${gradient}, ${url}`;
    }

    get nextBackgroundImage() {
        let url = '';

        if (this.photos?.photos.length) {
            const photo = this.photos.photos[this.nextPhotoIndex].src.original;
            url = `${photo}?auto=compress&fit=crop&w=1920&h=1080`;
        }
        return url;
    }

    public ngOnInit(): void {
        this.getPhotos();
    }

    private getPhotos(): void {
        this.pexelsService.getPhotos('Cats').subscribe((result) => {
            this.photos = result;
            this.backgroundImageInterval();
        });

        setTimeout(() => {
            this.getPhotos();
        }, 1000 * 60 * 60); // 60 minutes, all 60 images should have been looped now
    }

    private backgroundImageInterval(): void {
        this.currentPhotoIndex = 0;
        this.nextPhotoIndex = 1;

        clearTimeout(this.backgroundInterval);

        this.backgroundInterval = setInterval(() => {
            if (this.currentPhotoIndex + 1 === this.photos?.photos.length) {
                this.currentPhotoIndex = 0;
            } else {
                this.currentPhotoIndex = this.currentPhotoIndex + 1;
            }

            if (this.nextPhotoIndex + 1 === this.photos?.photos.length) {
                this.nextPhotoIndex = 0;
            } else {
                this.nextPhotoIndex = this.nextPhotoIndex + 1;
            }
        }, 1000 * 60 * 1); // 1 minute
    }
}
