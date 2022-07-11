import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OVP } from 'src/app/data/models/ovp.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OVPService } from 'src/app/data/services/ovp.service';
import { OVPVideo } from 'src/app/data/models/ovp-video.model';
import { Favorites } from 'src/app/data/models/favorites.model';
import { OVPVideoService } from 'src/app/data/services/ovpvideo.service';
import { RaspberryService } from 'src/app/data/services/raspberry.service';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-ovp',
    templateUrl: './ovp.component.html',
    styleUrls: ['./ovp.component.scss'],
})
export class OVPComponent implements OnInit, OnDestroy {
    public ovp!: OVP;
    public playing = false;
    public ovpVideoThumbTimeout!: number;
    public ngUnsubscribe = new Subject<void>();
    public query!: string;
    public order!: string;
    public page!: number;
    public favorites: Favorites | undefined;
    public favoriteVideos: OVPVideo[] = [];
    public showFavorites = false;

    @ViewChild('main') private main!: ElementRef<HTMLElement>;

    constructor(
        private ovpService: OVPService,
        private ovpVideoService: OVPVideoService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private raspberryService: RaspberryService
    ) {}

    public routerNavigate(event?: Event, page = 1): void {
        this.page = page;

        const target = event?.target as HTMLElement;
        if (target) {
            target.blur();
        }

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
                order: this.order,
                page: this.page,
                search: this.query,
                showFavorites: this.showFavorites,
            },
            queryParamsHandling: 'merge',
        });
    }

    public searchOVP(order: string, page: number, query?: string): void {
        this.ovpService
            .searchOVP(order, page, query)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result) => {
                this.ovp = result;

                setTimeout(() => {
                    this.main?.nativeElement.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    });
                });

                this.getFavorites();
            });
    }

    public setNewThumbnail(
        ovpVideo: OVPVideo,
        clearOVPVideoThumbTimeout = true,
        index = 0
    ) {
        if (clearOVPVideoThumbTimeout) {
            clearTimeout(this.ovpVideoThumbTimeout);
        }

        ovpVideo.current_thumb = ovpVideo.thumbs[index];

        this.ovpVideoThumbTimeout = window.setTimeout(() => {
            this.setNewThumbnail(
                ovpVideo,
                false,
                index + 1 >= ovpVideo.thumbs.length ? 0 : index + 1
            );
        }, 750);
    }

    public setDefaultThumbnail(ovpVideo: OVPVideo) {
        clearTimeout(this.ovpVideoThumbTimeout);
        ovpVideo.current_thumb = ovpVideo.default_thumb;
    }

    public listenForSearchChange(): void {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((queryParams) => {
                this.order = queryParams.get('order') ?? ('latest' as string);
                this.page = Number(queryParams.get('page') ?? (1 as number));
                this.query = queryParams.get('search') as string;
                this.showFavorites =
                    queryParams.get('showFavorites') === 'true' ? true : false;

                this.searchOVP(this.order, this.page, this.query);
            });
    }

    public getFavorites(): void {
        this.raspberryService
            .getFavorites()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result) => {
                this.favorites = result;
                this.getFavoriteVideos();
            });
    }

    public getFavoriteVideos(): void {
        if (this.showFavorites) {
            this.favoriteVideos = [];

            this.favorites?.favorites?.forEach((favoriteId) => {
                if (favoriteId.length <= 1) {
                    return;
                }

                this.ovpVideoService
                    .getOVPVideo(favoriteId)
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((result) => {
                        this.favoriteVideos.unshift(result);
                    });
            });
        }
    }

    public setFavorite(event: Event, ovpVideo: OVPVideo): void {
        event.preventDefault();

        this.raspberryService
            .setFavorite(ovpVideo.id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result) => {
                this.favorites = result;
            });
    }

    public showFavoriteButton(target: any): void {
        target.parentElement.parentElement.classList.remove('hidden');
    }

    public ngOnInit(): void {
        this.listenForSearchChange();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
