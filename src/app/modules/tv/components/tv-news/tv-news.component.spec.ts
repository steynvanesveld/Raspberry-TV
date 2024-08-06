import { Rss } from 'src/app/data/models/rss.model';
import { TvNewsComponent } from './tv-news.component';
import { provideHttpClient } from '@angular/common/http';
import { NewsService } from 'src/app/data/services/news.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NewsServiceMock, newsItem } from 'src/app/data/services/mocks/news.service.mock';

describe('TvNewsComponent', () => {
    let component: TvNewsComponent;
    let newsService: NewsService;
    let fixture: ComponentFixture<TvNewsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: NewsService, useClass: NewsServiceMock },
            ],
            declarations: [TvNewsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TvNewsComponent);
        newsService = TestBed.inject(NewsService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getNews()', () => {
        it('should call multiple newsServices', () => {
            spyOn(newsService, 'getEasterEggNews').and.callThrough();
            spyOn(newsService, 'getNos').and.callThrough();
            spyOn(newsService, 'getRTVDrenthe').and.callThrough();
            spyOn(newsService, 'getHoogeveenscheCourant').and.callThrough();

            component.getNews();

            expect(newsService.getEasterEggNews).toHaveBeenCalled();
            expect(newsService.getNos).toHaveBeenCalled();
            expect(newsService.getRTVDrenthe).toHaveBeenCalled();
            expect(newsService.getHoogeveenscheCourant).toHaveBeenCalled();
        });

        it('should call setNewsItems()', () => {
            spyOn(component, 'setNewsItems');

            component.getNews();

            expect(component.setNewsItems).toHaveBeenCalled();
        });

        it('should call itself after 60 minutes', () => {
            jasmine.clock().install();
            spyOn(component, 'getNews').and.callThrough();

            component.getNews();

            jasmine.clock().tick(1000 * 60 * 60);

            expect(component.getNews).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('setNewsItems()', () => {
        it('should reset newsLoading.items', () => {
            expect(component.newsLoading.items).not.toEqual([]);

            component.setNewsItems([
                {
                    name: 'Name',
                    rss: new Rss([]),
                    getIndividualNewsItem: false,
                },
            ]);

            expect(component.newsLoading.items).toEqual([]);
        });

        it('should set items descripton when getIndividualNewsItem is true', () => {
            component.setNewsItems([
                {
                    name: 'Name',
                    rss: new Rss(component.newsLoading.items),
                    getIndividualNewsItem: true,
                },
            ]);

            expect(component.news.items[0].description).toEqual(newsItem.description);
        });

        it('should not set items descripton when it contains a paywall', () => {
            spyOn(newsService, 'getNewsItem').and.returnValue(
                new NewsServiceMock().getNewsItemPayWall(),
            );

            component.setNewsItems([
                {
                    name: 'Name',
                    rss: new Rss(component.newsLoading.items),
                    getIndividualNewsItem: true,
                },
            ]);

            expect(component.news.items[0].description).not.toContain('paywall-initial');
        });

        it('should set the source of every item to the source name', () => {
            component.news.items[0].source = '';

            component.setNewsItems([
                {
                    name: 'SourceName',
                    rss: new Rss(component.newsLoading.items),
                    getIndividualNewsItem: false,
                },
            ]);

            expect(component.news.items[0].source).toEqual('SourceName');
        });

        it('should copy newsLoading to news when lastSource is true', () => {
            component.news.items = [];

            component.setNewsItems([
                {
                    name: 'Name',
                    rss: new Rss(component.newsLoading.items),
                    getIndividualNewsItem: false,
                },
            ]);

            expect(component.news.items).toEqual(component.newsLoading.items);
        });

        it('should set timestamp to current time', () => {
            const now = new Date();
            const time = now.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            });

            component.setNewsItems([
                {
                    name: 'Name',
                    rss: new Rss([]),
                    getIndividualNewsItem: false,
                },
            ]);

            expect(component.timestamp).toEqual(time);
        });

        it('should call setCurrentNewsArticle', () => {
            spyOn(component, 'setCurrentNewsArticle').and.callThrough();

            component.setNewsItems([
                {
                    name: 'Name',
                    rss: new Rss([]),
                    getIndividualNewsItem: false,
                },
            ]);

            expect(component.setCurrentNewsArticle).toHaveBeenCalled();
        });
    });

    describe('setCurrentNewsArticle()', () => {
        it('should call scrollNewsArticle()', () => {
            spyOn(component, 'scrollNewsArticle').and.callThrough();

            component.setCurrentNewsArticle();

            expect(component.scrollNewsArticle).toHaveBeenCalled();
        });

        it('should reset currentNewsArticleIndex when argument is not given', () => {
            component.currentNewsArticleIndex = 1;

            component.setCurrentNewsArticle();

            expect(component.currentNewsArticleIndex).toEqual(0);
        });

        it('should decrease currentNewsArticleIndex when argument is "previous"', () => {
            component.currentNewsArticleIndex = 1;

            component.setCurrentNewsArticle('previous');

            expect(component.currentNewsArticleIndex).toEqual(0);
        });

        it('should set currentNewsArticleIndex to maximum possible when argument is "previous" and current is 0', () => {
            component.currentNewsArticleIndex = 0;

            component.setCurrentNewsArticle('previous');

            expect(component.currentNewsArticleIndex).toEqual(7);
        });

        it('should increase currentNewsArticleIndex when argument is "next"', () => {
            component.currentNewsArticleIndex = 1;

            component.setCurrentNewsArticle('next');

            expect(component.currentNewsArticleIndex).toEqual(2);
        });

        it('should reset currentNewsArticleIndex when argument is "next" and reached the end', () => {
            component.currentNewsArticleIndex = 7;

            component.setCurrentNewsArticle('next');

            expect(component.currentNewsArticleIndex).toEqual(0);
        });
    });

    describe('scrollNewsArticle()', () => {
        it('should call setNextNewsItemTimeout()', () => {
            spyOn(component, 'setNextNewsItemTimeout').and.callThrough();

            component.scrollNewsArticle();

            expect(component.setNextNewsItemTimeout).toHaveBeenCalled();
        });
    });

    describe('setNextNewsItemTimeout()', () => {
        it('should call setCurrentNewsArticle() after 1 minute', () => {
            jasmine.clock().install();
            spyOn(component, 'setCurrentNewsArticle').and.callThrough();

            component.setNextNewsItemTimeout();

            jasmine.clock().tick(1000 * 60);

            expect(component.setCurrentNewsArticle).toHaveBeenCalledWith('next');

            jasmine.clock().uninstall();
        });
    });

    describe('listenForKeyDown()', () => {
        it('should do nothing when overlay is true', () => {
            spyOn(component, 'scrollNewsArticle').and.callThrough();

            component.overlay = true;

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowDown');

            expect(component.scrollNewsArticle).not.toHaveBeenCalled();
        });

        it('should call scrollNewsArticle() on key "ArrowDown"', () => {
            spyOn(component, 'scrollNewsArticle').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowDown');

            expect(component.scrollNewsArticle).toHaveBeenCalledWith('down');
        });

        it('should call scrollNewsArticle() on key "ArrowUp"', () => {
            spyOn(component, 'scrollNewsArticle').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowUp');

            expect(component.scrollNewsArticle).toHaveBeenCalledWith('up');
        });

        it('should call setCurrentNewsArticle() on key "ArrowLeft"', () => {
            spyOn(component, 'setCurrentNewsArticle').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowLeft');

            expect(component.setCurrentNewsArticle).toHaveBeenCalledWith('previous');
        });

        it('should call setCurrentNewsArticle() on key "ArrowRight"', () => {
            spyOn(component, 'setCurrentNewsArticle').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowRight');

            expect(component.setCurrentNewsArticle).toHaveBeenCalledWith('next');
        });
    });

    describe('ngOnInit()', () => {
        it('should call getNews()', () => {
            spyOn(component, 'getNews').and.callThrough();
            component.ngOnInit();
            expect(component.getNews).toHaveBeenCalled();
        });

        it('should call listenForKeyDown()', () => {
            spyOn(component, 'listenForKeyDown').and.callThrough();
            component.ngOnInit();
            expect(component.listenForKeyDown).toHaveBeenCalled();
        });
    });
});
