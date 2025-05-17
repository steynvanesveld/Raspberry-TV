import { interval } from 'rxjs';
import { Npm } from '@data/models/npm.model';
import { NpmService } from '@data/services/npm.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv-npmfeed',
    templateUrl: './tv-npmfeed.component.html',
    styleUrl: './tv-npmfeed.component.scss',
})
export class TvNpmfeedComponent implements OnInit {
    public destroyRef = inject(DestroyRef);

    constructor(private npmService: NpmService) {}

    public packages: Npm[] = [{ name: '@foxreis/tizentube' }, { name: '@angular/core' }];

    public getFeed(): void {
        this.packages.forEach((pkg) => {
            this.npmService
                .getDetails(pkg.name)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((response) => {
                    pkg.distTags = response.distTags;
                });
        });
    }

    public ngOnInit(): void {
        this.getFeed();

        interval(24 * 60 * 60 * 1000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.getFeed());
    }
}
