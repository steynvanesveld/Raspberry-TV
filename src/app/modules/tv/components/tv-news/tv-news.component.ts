import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Rss } from 'src/app/data/models/rss.model';
import { RssItem } from 'src/app/data/models/rss-item.model';
import { NewsService } from 'src/app/data/services/news.service';
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
    @Input() public keyDownSubject = new Subject<KeyboardEvent>();

    @ViewChild('newsArticle') private newsArticle!: ElementRef<HTMLElement>;

    public news!: Rss;
    public currentNewsArticleIndex = 0;
    public ngUnsubscribe = new Subject<void>();
    public nextNewsItemTimeout!: number;

    constructor(private newsService: NewsService) {}

    private getNews(): void {
        this.newsService
            .getNos()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                response.items.map((item: RssItem) => (item.source = 'NOS'));
                this.news = response;

                this.newsService
                    .getHoogeveenscheCourant()
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((response) => {
                        response.items.map(
                            (item: RssItem) =>
                                (item.source = 'Hoogeveensche Courant')
                        );

                        this.news.items = this.news.items.concat(
                            response.items
                        );

                        this.changeNewsArticle('reset');
                    });
            });

        window.setTimeout(() => {
            this.getNews();
        }, 1000 * 60 * 60); // 60 minutes
    }

    private changeNewsArticle(action: 'previous' | 'next' | 'reset'): void {
        this.scrollNewsArticle();

        if (action === 'previous') {
            if (this.currentNewsArticleIndex - 1 < 0) {
                this.currentNewsArticleIndex = this.news?.items.length - 1;
            } else {
                this.currentNewsArticleIndex = this.currentNewsArticleIndex - 1;
            }
        }

        if (action === 'next') {
            if (this.currentNewsArticleIndex + 1 === this.news?.items.length) {
                this.currentNewsArticleIndex = 0;
            } else {
                this.currentNewsArticleIndex = this.currentNewsArticleIndex + 1;
            }
        }

        if (action === 'reset') {
            this.currentNewsArticleIndex = 0;
        }
    }

    private scrollNewsArticle(direction?: 'up' | 'down'): void {
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

    private setNextNewsItemTimeout() {
        clearTimeout(this.nextNewsItemTimeout);

        this.nextNewsItemTimeout = window.setTimeout(() => {
            this.changeNewsArticle('next');
        }, 1000 * 60 * 1); // 1 minute;
    }

    private listenForKeyDown(): void {
        this.keyDownSubject.subscribe((event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                this.scrollNewsArticle('down');
            }

            if (event.key === 'ArrowUp') {
                this.scrollNewsArticle('up');
            }

            if (event.key === 'ArrowLeft') {
                this.changeNewsArticle('previous');
            }

            if (event.key === 'ArrowRight') {
                this.changeNewsArticle('next');
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
