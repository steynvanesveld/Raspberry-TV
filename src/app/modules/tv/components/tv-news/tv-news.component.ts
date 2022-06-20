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
    public currentNewsItemIndex = 0;
    public ngUnsubscribe = new Subject<void>();

    public timeout: any;

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
            if (this.currentNewsItemIndex - 1 < 0) {
                this.currentNewsItemIndex = this.news?.items.length - 1;
            } else {
                this.currentNewsItemIndex = this.currentNewsItemIndex - 1;
            }
        }

        if (action === 'next') {
            if (this.currentNewsItemIndex + 1 === this.news?.items.length) {
                this.currentNewsItemIndex = 0;
            } else {
                this.currentNewsItemIndex = this.currentNewsItemIndex + 1;
            }
        }

        if (action === 'reset') {
            this.currentNewsItemIndex = 0;
        }
    }

    private scrollNewsArticle(direction?: 'up' | 'down'): void {
        this.setThisTimeout();

        const article = this.newsArticle.nativeElement;
        let top = 0;
        const amount = 100;

        if (direction === 'up') {
            top = article.scrollTop - amount;
        }

        if (direction === 'down') {
            top = article.scrollTop + amount;
        }

        article.scroll({
            top,
            left: 0,
        });
    }

    private setThisTimeout() {
        clearTimeout(this.timeout);

        this.timeout = window.setTimeout(() => {
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
        this.getGeneralNews();
        this.listenForKeyDown();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
