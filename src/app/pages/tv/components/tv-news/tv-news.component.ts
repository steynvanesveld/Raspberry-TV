import { map } from 'rxjs/operators';
import { Rss } from '@data/models/rss.model';
import { Subject, combineLatest } from 'rxjs';
import { RssItem } from '@data/models/rss-item.model';
import { NewsService } from '@data/services/news.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyboardEventKey } from '@data/models/keyboard-event-key.type';
import { Component, ElementRef, Input, OnInit, ViewChild, DestroyRef, inject } from '@angular/core';

@Component({
    selector: 'app-tv-news',
    templateUrl: './tv-news.component.html',
    styleUrl: './tv-news.component.scss',
})
export class TvNewsComponent implements OnInit {
    @Input() public keyDownSubject = new Subject<KeyboardEventKey>();
    @Input() public overlay!: boolean;

    @ViewChild('newsArticle') public newsArticle!: ElementRef<HTMLElement>;

    public timestamp!: string;
    public news = new Rss([]);
    public newsLoading = new Rss([]);
    public currentNewsArticleIndex = 0;
    public destroyRef = inject(DestroyRef);
    public nextNewsItemTimeout!: number;

    constructor(private newsService: NewsService) {}

    public getNews(): void {
        combineLatest([
            this.newsService.getEasterEggNews(),
            this.newsService.getNos(),
            this.newsService.getRTVDrenthe(),
            this.newsService.getHoogeveenscheCourant(),
        ])
            .pipe(
                map((results) => [
                    { name: 'Beestenboel', rss: results[0] },
                    { name: 'NOS', rss: results[1] },
                    {
                        name: 'RTV Drenthe',
                        rss: results[2],
                        getIndividualNewsItem: true,
                    },
                    {
                        name: 'Hoogeveensche Courant',
                        rss: results[3],
                        getIndividualNewsItem: true,
                    },
                ]),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((response) => {
                this.setNewsItems(response);
            });

        setTimeout(
            () => {
                this.getNews();
            },
            1000 * 60 * 60,
        ); // 60 minutes
    }

    public setNewsItems(
        sources: {
            name: string;
            rss: Rss;
            getIndividualNewsItem?: boolean;
        }[],
    ): void {
        const todayMidnight = new Date().setHours(0, 0, 0, 0);
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const twoDaysAgoMidnight = twoDaysAgo.setHours(0, 0, 0, 0);

        this.newsLoading.items = [];

        sources.forEach((source) => {
            if (source.getIndividualNewsItem) {
                source.rss.items.map((item: RssItem) => {
                    this.newsService
                        .getNewsItem(item.link ?? '')
                        .pipe(takeUntilDestroyed(this.destroyRef))
                        .subscribe((response) => {
                            if (
                                response.items[0].description.includes('paywall-initial') ||
                                response.items[0].description.includes('subscribe-only-article')
                            ) {
                                return;
                            }
                            item.description = response.items[0].description;
                        });
                });
            }

            source.rss.items.forEach((item: RssItem) => (item.source = source.name));

            this.newsLoading.items = this.newsLoading.items
                .concat(source.rss.items)
                .filter((item) => {
                    const pubDateMidnight = structuredClone(item).pubDate.setHours(0, 0, 0, 0);

                    return (
                        item.pubDate !== undefined &&
                        pubDateMidnight <= todayMidnight &&
                        pubDateMidnight >= twoDaysAgoMidnight
                    );
                })
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

    public setNextNewsItemTimeout(): void {
        clearTimeout(this.nextNewsItemTimeout);

        this.nextNewsItemTimeout = window.setTimeout(() => {
            this.setCurrentNewsArticle('next');
        }, 1000 * 60); // 1 minute;
    }

    public listenForKeyDown(): void {
        this.keyDownSubject
            .pipe(takeUntilDestroyed(this.destroyRef))
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
}
