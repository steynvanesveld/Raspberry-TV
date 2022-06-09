import { Subject } from 'rxjs';
import { wallpaperChange } from '../../tv.animations';
import { Component, Input, OnInit } from '@angular/core';
import { Photos } from 'src/app/data/models/photos.model';
import { PexelsService } from 'src/app/data/services/pexels.service';

@Component({
    selector: 'app-tv-wallpaper',
    templateUrl: './tv-wallpaper.component.html',
    styleUrls: ['./tv-wallpaper.component.scss'],
    animations: [wallpaperChange],
})
export class TvWallpaperComponent implements OnInit {
    @Input() public fetchDataSubject: Subject<void> | undefined;
    @Input() public showDataSubject: Subject<void> | undefined;

    public photos: Photos | undefined;
    public photoUrlParams = '?auto=compress&fit=crop&w=1920&h=1080';
    public currentPhotoIndex = 0;
    public nextPhotoIndex = 1;

    constructor(private pexelsService: PexelsService) {}

    public ngOnInit(): void {
        this.observeFetchDataSubject();
        this.observeShowDataSubject();
    }

    private observeFetchDataSubject(): void {
        this.fetchDataSubject?.subscribe(() => {
            this.getPhotos();
        });
    }

    private observeShowDataSubject(): void {
        this.showDataSubject?.subscribe(() => {
            this.setCurrentPhotoIndex();
        });
    }

    private getPhotos(): void {
        this.pexelsService.getPhotos('Cats').subscribe((result) => {
            this.photos = result;
        });
    }

    private setCurrentPhotoIndex(): void {
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
    }
}
