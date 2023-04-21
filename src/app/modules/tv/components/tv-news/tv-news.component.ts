import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

    public news = new Rss([]);
    public newsLoading = new Rss([]);
    public currentNewsArticleIndex = 0;
    public ngUnsubscribe = new Subject<void>();
    public nextNewsItemTimeout!: number;

    constructor(private newsService: NewsService) {}

    public getNews(): void {
        this.getNos();

        setTimeout(() => {
            this.getNews();
        }, 1000 * 60 * 60); // 60 minutes
    }

    public getNos(): void {
        this.newsService
            .getNos()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response: Rss) => {
                this.setNewsItems({
                    source: 'NOS',
                    items: response.items,
                    firstSource: true,
                });
                this.getRTVDrenthe();
            });
    }

    public getRTVDrenthe(): void {
        this.newsService
            .getRTVDrenthe()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response: Rss) => {
                this.setNewsItems({
                    source: 'RTV Drenthe',
                    items: response.items,
                    getAdditionalDescription: true,
                });
                this.getHoogeveenscheCourant();
            });
    }

    public getHoogeveenscheCourant(): void {
        this.newsService
            .getHoogeveenscheCourant()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response: Rss) => {
                this.setNewsItems({
                    source: 'Hoogeveensche Courant',
                    items: response.items,
                    getAdditionalDescription: true,
                    lastSource: true,
                });
            });
    }

    public setNewsItems(payload: {
        source: string;
        items: RssItem[];
        getAdditionalDescription?: boolean;
        firstSource?: boolean;
        lastSource?: boolean;
    }): void {
        if (payload.firstSource) {
            this.newsLoading.items = [];
        }

        if (payload.getAdditionalDescription) {
            payload.items.map((item: RssItem) => {
                this.newsService
                    .getNewsItem(item.link ?? '')
                    .pipe(takeUntil(this.ngUnsubscribe))
                    .subscribe((response) => {
                        item.description = response.items[0].description;
                    });
            });
        }

        payload.items.map((item: RssItem) => (item.source = payload.source));

        this.newsLoading.items = this.newsLoading.items
            .concat(payload.items)
            .filter((item) => item.pubDate !== undefined)
            .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

        if (payload.lastSource) {
            this.news = { ...this.newsLoading };
            this.changeNewsArticle();
        }
    }

    public changeNewsArticle(action?: 'previous' | 'next'): void {
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
            this.changeNewsArticle('next');
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
                    this.changeNewsArticle('previous');
                }

                if (key === 'ArrowRight') {
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
