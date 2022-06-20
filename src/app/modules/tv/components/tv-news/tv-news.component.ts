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

    public rss!: Rss;
    public currentNewsItemIndex = 0;
    public ngUnsubscribe = new Subject<void>();

    constructor(private nosService: NosService) {}

    private setCurrentNewsItemIndex(): void {
        if (this.newsArticle) {
            this.scrollNewsArticle();
        }

        if (this.currentNewsItemIndex + 1 === this.rss?.items.length) {
            this.currentNewsItemIndex = 0;
        } else {
            this.currentNewsItemIndex = this.currentNewsItemIndex + 1;
        }

        setTimeout(() => {
            this.setCurrentNewsItemIndex();
        }, 1000 * 60 * 1); // 1 minute
    }

    private getGeneralNews(): void {
        this.nosService
            .getGeneralNews()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.rss = response;
            });

        setTimeout(() => {
            this.getGeneralNews();
        }, 1000 * 60 * 60); // 60 minutes
    }

    private listenForKeyDown(): void {
        this.keyDownSubject.subscribe((event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                this.scrollNewsArticle('Down');
            }

            if (event.key === 'ArrowUp') {
                this.scrollNewsArticle('Up');
            }
        });
    }

    private scrollNewsArticle(direction?: 'Up' | 'Down'): void {
        const article = this.newsArticle.nativeElement;
        let top = 0;
        const amount = 100;

        if (direction === 'Up') {
            top = article.scrollTop - amount;
        }

        if (direction === 'Down') {
            top = article.scrollTop + amount;
        }

        article.scroll({
            top,
            left: 0,
        });
    }

    public ngOnInit(): void {
        this.getGeneralNews();
        this.setCurrentNewsItemIndex();
        this.listenForKeyDown();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
