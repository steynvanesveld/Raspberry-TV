import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OVPVideo } from 'src/app/data/models/ovp-video.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Favorites } from 'src/app/data/models/favorites.model';
import { OVPVideoService } from 'src/app/data/services/ovpvideo.service';
import { RaspberryService } from 'src/app/data/services/raspberry.service';
import { OnInit, Component, Input, DestroyRef, inject } from '@angular/core';

@Component({
    selector: 'app-ovp-video',
    templateUrl: './ovp-video.component.html',
    styleUrls: ['./ovp-video.component.scss'],
})
export class OVPVideoComponent implements OnInit {
    public ovpVideo: OVPVideo | undefined;
    public destroyRef = inject(DestroyRef);
    @Input() public favorites: Favorites | undefined;

    constructor(
        private ovpVideoService: OVPVideoService,
        private raspberryService: RaspberryService,
        public activatedRoute: ActivatedRoute,
        public domSanitizer: DomSanitizer
    ) {}

    public getOVPVideo(id: string): void {
        this.ovpVideoService
            .getOVPVideo(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.ovpVideo = result;
            });
    }

    public getRouteData(): void {
        this.activatedRoute.queryParamMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((queryParams) => {
                const redirect = queryParams.get('redirect') as string;

                this.activatedRoute.params
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe((params) => {
                        if (redirect) {
                            this.reloadPage(`/#/ovp/${params['id']}`);
                        } else {
                            this.getOVPVideo(params['id']);
                        }
                    });
            });
    }

    /* istanbul ignore next */
    public reloadPage(url: string): void {
        window.location.replace(url);
        window.location.reload();
    }

    public url(keyword: string): string {
        return `/#/ovp?search=${encodeURIComponent(keyword.trim())}`;
    }

    public getFavorites(): void {
        this.raspberryService
            .getFavorites()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.favorites = result;
            });
    }

    public setFavorite(ovpVideo: OVPVideo): void {
        this.raspberryService
            .setFavorite(ovpVideo.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((result) => {
                this.favorites = result;
            });
    }

    public ngOnInit(): void {
        this.getRouteData();
        this.getFavorites();
    }
}
