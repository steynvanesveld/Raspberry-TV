import { Component, OnInit } from '@angular/core';
import { Rss } from 'src/app/data/models/rss.model';
import { dataChange } from 'src/app/modules/tv/tv.animations';
import { NosService } from 'src/app/data/services/nos.service';

@Component({
    selector: 'app-tv-news',
    templateUrl: './tv-news.component.html',
    styleUrls: ['./tv-news.component.scss'],
    animations: [dataChange],
})
export class TvNewsComponent implements OnInit {
    public rss: Rss | undefined;
    public currentNewsItemIndex = 0;

    constructor(private nosService: NosService) {}

    public ngOnInit(): void {
        this.getGeneralNews();
        this.setCurrentNewsItemIndex();
    }

    public getGeneralNews(): void {
        this.nosService.getGeneralNews().subscribe((response) => {
            this.rss = response;
        });

        setTimeout(() => {
            this.getGeneralNews();
        }, 1000 * 60 * 60); // 60 minutes
    }

    private setCurrentNewsItemIndex(): void {
        if (this.currentNewsItemIndex + 1 === this.rss?.items.length) {
            this.currentNewsItemIndex = 0;
        } else {
            this.currentNewsItemIndex = this.currentNewsItemIndex + 1;
        }

        setTimeout(() => {
            this.setCurrentNewsItemIndex();
        }, 1000 * 60 * 1); // 1 minute
    }
}
