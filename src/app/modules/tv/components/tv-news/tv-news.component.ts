import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Rss } from 'src/app/data/models/rss.model';
import { NosService } from 'src/app/data/services/nos.service';
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

    public nextNewsItemTimeout: any;
    public doubleKeyDownTimeout: any;

    constructor(private nosService: NosService) {}

    private getGeneralNews(): void {
        this.nosService
            .getGeneralNews()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.news = response;
                this.changeNewsArticle('reset');
            });

        setTimeout(() => {
            this.getGeneralNews();
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

        this.nextNewsItemTimeout = setTimeout(() => {
            this.changeNewsArticle('next');
        }, 1000 * 60 * 1); // 1 minute;
    }

    private listenForKeyDown(): void {
        this.keyDownSubject.subscribe((event: KeyboardEvent) => {
            clearTimeout(this.doubleKeyDownTimeout);

            this.doubleKeyDownTimeout = setTimeout(() => {
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
            }, 250);
        });
    }

    public ngOnInit(): void {
        this.getGeneralNews();
        this.listenForKeyDown();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
