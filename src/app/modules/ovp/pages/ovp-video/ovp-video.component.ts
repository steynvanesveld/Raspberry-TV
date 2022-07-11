import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OVPService } from 'src/app/data/services/ovp.service';
import { OVPVideo } from 'src/app/data/models/ovp-video.model';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { OVPVideoService } from 'src/app/data/services/ovpvideo.service';

@Component({
    selector: 'app-ovp-video',
    templateUrl: './ovp-video.component.html',
    styleUrls: ['./ovp-video.component.scss'],
})
export class OVPVideoComponent implements AfterViewInit, OnDestroy {
    public ovpVideo!: OVPVideo;
    public ngUnsubscribe = new Subject<void>();

    constructor(
        private ovpService: OVPService,
        private ovpVideoService: OVPVideoService,
        private activatedRoute: ActivatedRoute,
        private domSanitizer: DomSanitizer
    ) {}

    public sanitizedEmbedUrl(): string {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(
            this.ovpVideo?.embed ?? ''
        ) as string;
    }

    public getOVPVideo(id: string): void {
        this.ovpVideoService
            .getOVPVideo(id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result) => {
                this.ovpVideo = result;
            });
    }

    public getRouteData(): void {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((queryParams) => {
                const redirect = queryParams.get('redirect') as string;

                this.activatedRoute.params
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((params) => {
                        if (redirect) {
                            window.location.replace(`/#/ovp/${params['id']}`);
                            window.location.reload();
                        } else {
                            this.getOVPVideo(params['id']);
                        }
                    });
            });
    }

    public ngAfterViewInit(): void {
        this.getRouteData();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
