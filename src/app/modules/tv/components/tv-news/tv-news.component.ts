import { Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Rss } from 'src/app/data/models/rss.model';
import { RssItem } from 'src/app/data/models/rss-item.model';
import { NewsService } from 'src/app/data/services/news.service';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';
import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-tv-news',
    templateUrl: './tv-news.component.html',
    styleUrls: ['./tv-news.component.scss'],
})
export class TvNewsComponent implements OnInit, OnDestroy {
    @Input() public keyDownSubject = new Subject<KeyboardEventKey>();
    @Input() public overlay!: boolean;

    @ViewChild('newsArticle') public newsArticle!: ElementRef<HTMLElement>;

    public timestamp!: string;
    public news = new Rss([]);
    public newsLoading = new Rss([]);
    public currentNewsArticleIndex = 0;
    public ngUnsubscribe = new Subject<void>();
    public nextNewsItemTimeout!: number;

    constructor(private newsService: NewsService) {}

    public getNews(): void {
        combineLatest([
            this.newsService.getNos(),
            this.newsService.getRTVDrenthe(),
            this.newsService.getHoogeveenscheCourant(),
        ])
            .pipe(
                map((results) => [
                    { name: 'NOS', rss: results[0] },
                    {
                        name: 'RTV Drenthe',
                        rss: results[1],
                        getIndividualNewsItem: true,
                    },
                    {
                        name: 'Hoogeveensche Courant',
                        rss: results[2],
                        getIndividualNewsItem: true,
                    },
                ]),
                takeUntil(this.ngUnsubscribe)
            )
            .subscribe((response) => {
                this.setNewsItems(response);
            });

        setTimeout(() => {
            this.getNews();
        }, 1000 * 60 * 60); // 60 minutes
    }

    public setNewsItems(
        sources: {
            name: string;
            rss: Rss;
            getIndividualNewsItem?: boolean;
        }[]
    ): void {
        this.newsLoading.items = [];

        sources.forEach((source) => {
            if (source.getIndividualNewsItem) {
                source.rss.items.map((item: RssItem) => {
                    this.newsService
                        .getNewsItem(item.link ?? '')
                        .pipe(takeUntil(this.ngUnsubscribe))
                        .subscribe((response) => {
                            item.description = response.items[0].description;
                        });
                });
            }

            source.rss.items.forEach(
                (item: RssItem) => (item.source = source.name)
            );

            this.newsLoading.items = this.newsLoading.items
                .concat(source.rss.items)
                .filter((item) => item.pubDate !== undefined)
                .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
        });

        this.news = { ...this.newsLoading };

        this.timestamp = new Date().toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        this.setCurrentNewsArticle();
    }

    public setCurrentNewsArticle(action?: 'previous' | 'next'): void {
        this.scrollNewsArticle();

        if (action === 'previous') {
            if (this.currentNewsArticleIndex - 1 < 0) {
                this.currentNewsArticleIndex = this.news.items.length - 1;
            } else {
                this.currentNewsArticleIndex = this.currentNewsArticleIndex - 1;
            }
            return;
        }

        if (action === 'next') {
            if (this.currentNewsArticleIndex + 1 === this.news.items.length) {
                this.currentNewsArticleIndex = 0;
            } else {
                this.currentNewsArticleIndex = this.currentNewsArticleIndex + 1;
            }
            return;
        }

        this.currentNewsArticleIndex = 0;
    }

    public scrollNewsArticle(direction?: 'up' | 'down'): void {
        const article = this.newsArticle.nativeElement;
        const amount = 250;
        let top = 0;

        this.setNextNewsItemTimeout();

        if (direction === 'up') {
            top = article.scrollTop - amount;
        }

        if (direction === 'down') {
            top = article.scrollTop + amount;
        }

        article.scroll({
            top,
            left: 0,
            behavior: 'smooth',
        });
    }

    public setNextNewsItemTimeout() {
        clearTimeout(this.nextNewsItemTimeout);

        this.nextNewsItemTimeout = window.setTimeout(() => {
            this.setCurrentNewsArticle('next');
        }, 1000 * 60); // 1 minute;
    }

    public listenForKeyDown(): void {
        this.keyDownSubject
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((key: KeyboardEventKey) => {
                if (this.overlay) {
                    return;
                }

                if (key === 'ArrowDown') {
                    this.scrollNewsArticle('down');
                }

                if (key === 'ArrowUp') {
                    this.scrollNewsArticle('up');
                }

                if (key === 'ArrowLeft') {
                    this.setCurrentNewsArticle('previous');
                }

                if (key === 'ArrowRight') {
                    this.setCurrentNewsArticle('next');
                }
            });
    }

    public ngOnInit(): void {
        this.getNews();
        this.listenForKeyDown();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
