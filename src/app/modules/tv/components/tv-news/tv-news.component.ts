import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NosService } from 'src/app/data/services/nos.service';

@Component({
    selector: 'app-tv-news',
    templateUrl: './tv-news.component.html',
    styleUrls: ['./tv-news.component.scss'],
})
export class TvNewsComponent implements OnInit {
    public generalNews: any;
    public currentNewsItemIndex = 0;
    private newsItemInterval: any;

    constructor(private nosService: NosService) {}

    public ngOnInit(): void {
        this.getGeneralNews();
    }

    public getGeneralNews(): void {
        this.nosService.getGeneralNews().subscribe({
            error: (error: HttpErrorResponse) => {
                const text = error.error.text;
                const xml = new window.DOMParser().parseFromString(
                    text,
                    'text/xml'
                );
                const response = Array.from(xml.querySelectorAll('item')).map(
                    (item) => {
                        return {
                            title:
                                item
                                    .querySelector('title')
                                    ?.innerHTML.replace('<![CDATA[', '')
                                    .replace(']]>', '') ?? '',
                            description:
                                item
                                    .querySelector('description')
                                    ?.innerHTML.replace('<![CDATA[', '')
                                    .replace(']]>', '') ?? '',
                        };
                    }
                );

                this.generalNews = response;
                this.newsInterval();
            },
        });
    }

    private newsInterval(): void {
        this.currentNewsItemIndex = 0;

        clearTimeout(this.newsItemInterval);

        this.newsItemInterval = setInterval(() => {
            if (this.currentNewsItemIndex + 1 === this.generalNews?.length) {
                this.currentNewsItemIndex = 0;
            } else {
                this.currentNewsItemIndex = this.currentNewsItemIndex + 1;
            }
        }, 1000 * 60 * 1); // 1 minute
    }
}
