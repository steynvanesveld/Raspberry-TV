import { Component, OnInit } from '@angular/core';
import { Rss } from 'src/app/data/models/rss.model';
import { NosService } from 'src/app/data/services/nos.service';

@Component({
    selector: 'app-tv-news',
    templateUrl: './tv-news.component.html',
    styleUrls: ['./tv-news.component.scss'],
})
export class TvNewsComponent implements OnInit {
    public rss: Rss | undefined;
    public currentNewsItemIndex = 0;
    private newsItemInterval: any;

    constructor(private nosService: NosService) {}

    public ngOnInit(): void {
        this.getGeneralNews();
    }

    public getGeneralNews(): void {
        this.nosService.getGeneralNews().subscribe((response) => {
            this.rss = response;
            this.newsInterval();
        });
    }

    private newsInterval(): void {
        this.currentNewsItemIndex = 0;

        clearTimeout(this.newsItemInterval);

        this.newsItemInterval = setInterval(() => {
            if (this.currentNewsItemIndex + 1 === this.rss?.items.length) {
                this.currentNewsItemIndex = 0;
            } else {
                this.currentNewsItemIndex = this.currentNewsItemIndex + 1;
            }
        }, 1000 * 60 * 1); // 1 minute
    }
}
