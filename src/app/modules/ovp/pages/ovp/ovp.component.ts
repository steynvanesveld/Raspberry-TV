import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OVP } from 'src/app/data/models/ovp.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { OVPService } from 'src/app/data/services/ovp.service';
import { OVPVideo } from 'src/app/data/models/ovp-video.model';

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

    @ViewChild('main') private main!: ElementRef<HTMLElement>;

    constructor(
        private ovpService: OVPService,
        private router: Router,
        private activatedRoute: ActivatedRoute
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

    public goToOVPVideo(ovpVideo: OVPVideo): void {
        this.router.navigate([`/ovp/${ovpVideo.id}`], {
            queryParams: { redirect: 'true' },
        });
    }

    public listenForSearchChange(): void {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((queryParams) => {
                this.order = queryParams.get('order') ?? ('latest' as string);
                this.page = Number(queryParams.get('page') ?? (1 as number));
                this.query = queryParams.get('search') as string;

                this.searchOVP(this.order, this.page, this.query);
            });
    }

    public ngOnInit(): void {
        this.listenForSearchChange();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
