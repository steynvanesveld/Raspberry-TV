import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OVP } from 'src/app/data/models/ovp.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
    public ovpVideoThumbTimeout: any;
    public ngUnsubscribe = new Subject<void>();
    public search!: string;

    constructor(
        private ovpService: OVPService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    public searchChange(event: any): void {
        event.target.blur();

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { search: this.search },
            queryParamsHandling: 'merge',
        });
    }

    public searchOVP(query?: string): void {
        this.ovpService
            .searchOVP(query)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result) => {
                this.ovp = result;
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
                this.search = queryParams.get('search') as string;

                this.searchOVP(this.search);
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
