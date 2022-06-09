import { Subject } from 'rxjs';
import { Rss } from 'src/app/data/models/rss.model';
import { Component, Input, OnInit } from '@angular/core';
import { dataChange } from 'src/app/modules/tv/tv.animations';
import { NosService } from 'src/app/data/services/nos.service';

@Component({
    selector: 'app-tv-news',
    templateUrl: './tv-news.component.html',
    styleUrls: ['./tv-news.component.scss'],
    animations: [dataChange],
})
export class TvNewsComponent implements OnInit {
    @Input() public fetchDataSubject: Subject<void> | undefined;
    @Input() public showDataSubject: Subject<void> | undefined;

    public rss: Rss | undefined;
    public currentNewsItemIndex = 0;

    constructor(private nosService: NosService) {}

    public ngOnInit(): void {
        this.observeFetchDataSubject();
        this.observeShowDataSubject();
    }

    public observeFetchDataSubject(): void {
        this.fetchDataSubject?.subscribe(() => {
            this.getGeneralNews();
        });
    }

    public observeShowDataSubject(): void {
        this.showDataSubject?.subscribe(() => {
            this.setCurrentNewsItemIndex();
        });
    }

    public getGeneralNews(): void {
        this.nosService.getGeneralNews().subscribe((response) => {
            this.rss = response;
        });
    }

    private setCurrentNewsItemIndex(): void {
        if (this.currentNewsItemIndex + 1 === this.rss?.items.length) {
            this.currentNewsItemIndex = 0;
        } else {
            this.currentNewsItemIndex = this.currentNewsItemIndex + 1;
        }
    }
}
