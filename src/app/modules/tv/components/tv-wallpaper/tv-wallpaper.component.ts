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
    public photoParameters = '?auto=compress&fit=crop&w=1920&h=1080';
    public gradient =
        'linear-gradient(to bottom, rgba(105, 67, 45, 0.75), rgba(0, 0, 0, 0.75))';
    constructor(private pexelsService: PexelsService) {}

    get currentBackgroundImage() {
        let url = '';

        if (this.photos?.photos.length) {
            const photo = this.photos.photos[0].src.original;
            url = `url('${photo}${this.photoParameters}')`;
        }

        return `${this.gradient}, ${url}`;
    }

    public ngOnInit(): void {
        this.getPhotos();
    }

    private getPhotos(): void {
        this.pexelsService.getPhotos('Forest').subscribe((result) => {
            this.photos = result;
        });
    }
}
