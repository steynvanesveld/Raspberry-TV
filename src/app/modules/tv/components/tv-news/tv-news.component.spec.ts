import { TvNewsComponent } from './tv-news.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsService } from 'src/app/data/services/news.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsServiceMock } from 'src/app/data/services/mocks/news.service.mock';

describe('TvNewsComponent', () => {
    let component: TvNewsComponent;
    let newsService: NewsService;
    let fixture: ComponentFixture<TvNewsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [{ provide: NewsService, useClass: NewsServiceMock }],
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
        it('should call getNos()', () => {
            spyOn(component, 'getNos').and.callThrough();

            component.getNews();

            expect(component.getNos).toHaveBeenCalled();
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

    describe('getNos()', () => {
        it('should call newsService.getNos()', () => {
            spyOn(newsService, 'getNos').and.callThrough();

            component.getNos();

            expect(newsService.getNos).toHaveBeenCalled();
        });

        it('should call setNewsItems()', () => {
            spyOn(component, 'setNewsItems').and.callThrough();

            component.getNos();

            expect(component.setNewsItems).toHaveBeenCalled();
        });

        it('should call getRTVDrenthe()', () => {
            spyOn(newsService, 'getRTVDrenthe').and.callThrough();

            component.getNos();

            expect(newsService.getRTVDrenthe).toHaveBeenCalled();
        });
    });

    describe('getRTVDrenthe()', () => {
        it('should call newsService.getRTVDrenthe()', () => {
            spyOn(newsService, 'getRTVDrenthe').and.callThrough();

            component.getRTVDrenthe();

            expect(newsService.getRTVDrenthe).toHaveBeenCalled();
        });

        it('should call setNewsItems()', () => {
            spyOn(component, 'setNewsItems').and.callThrough();

            component.getRTVDrenthe();

            expect(component.setNewsItems).toHaveBeenCalled();
        });

        it('should call getHoogeveenscheCourant()', () => {
            spyOn(newsService, 'getHoogeveenscheCourant').and.callThrough();

            component.getRTVDrenthe();

            expect(newsService.getHoogeveenscheCourant).toHaveBeenCalled();
        });
    });

    describe('getHoogeveenscheCourant()', () => {
        it('should call newsService.getHoogeveenscheCourant()', () => {
            spyOn(newsService, 'getHoogeveenscheCourant').and.callThrough();

            component.getHoogeveenscheCourant();

            expect(newsService.getHoogeveenscheCourant).toHaveBeenCalled();
        });

        it('should call setNewsItems()', () => {
            spyOn(component, 'setNewsItems').and.callThrough();

            component.getHoogeveenscheCourant();

            expect(component.setNewsItems).toHaveBeenCalled();
        });
    });

    describe('setNewsItems()', () => {
        it('should reset newsLoading.items when firstSource is true', () => {
            expect(component.newsLoading.items).not.toEqual([]);
            component.setNewsItems({
                source: 'Foo',
                items: [],
                firstSource: true,
            });
            expect(component.newsLoading.items).toEqual([]);
        });

        it('should call newsService.getNewsItem() when getAdditionalDescription is true', () => {
            const link = 'url-of-news-item';
            component.news.items[0].link = link;
            spyOn(newsService, 'getNewsItem').and.callThrough();

            component.setNewsItems({
                source: 'Foo',
                items: component.news.items,
                getAdditionalDescription: true,
            });

            expect(newsService.getNewsItem).toHaveBeenCalledWith(link);
        });

        it('should call newsService.getNewsItem() with fallback when getAdditionalDescription is true and link is undefined', () => {
            const link = undefined;
            component.news.items[0].link = link;
            spyOn(newsService, 'getNewsItem').and.callThrough();

            component.setNewsItems({
                source: 'Foo',
                items: component.news.items,
                getAdditionalDescription: true,
            });

            expect(newsService.getNewsItem).toHaveBeenCalledWith('');
        });

        it('should copy newsLoading to news when lastSource is true', () => {
            component.news.items = [];
            component.setNewsItems({
                source: 'Foo',
                items: component.newsLoading.items,
                lastSource: true,
            });
            expect(component.news.items).toEqual(component.newsLoading.items);
        });

        it('should call changeNewsArticle when lastSource is true', () => {
            spyOn(component, 'changeNewsArticle').and.callThrough();
            component.setNewsItems({
                source: 'Foo',
                items: [],
                lastSource: true,
            });
            expect(component.changeNewsArticle).toHaveBeenCalled();
        });
    });

    describe('changeNewsArticle()', () => {
        it('should call scrollNewsArticle()', () => {
            spyOn(component, 'scrollNewsArticle').and.callThrough();

            component.changeNewsArticle();

            expect(component.scrollNewsArticle).toHaveBeenCalled();
        });

        it('should reset currentNewsArticleIndex when argument is not given', () => {
            component.currentNewsArticleIndex = 1;

            component.changeNewsArticle();

            expect(component.currentNewsArticleIndex).toEqual(0);
        });

        it('should decrease currentNewsArticleIndex when argument is "previous"', () => {
            component.currentNewsArticleIndex = 1;

            component.changeNewsArticle('previous');

            expect(component.currentNewsArticleIndex).toEqual(0);
        });

        it('should set currentNewsArticleIndex to maximum possible when argument is "previous" and current is 0', () => {
            component.currentNewsArticleIndex = 0;

            component.changeNewsArticle('previous');

            expect(component.currentNewsArticleIndex).toEqual(5);
        });

        it('should increase currentNewsArticleIndex when argument is "next"', () => {
            component.currentNewsArticleIndex = 1;

            component.changeNewsArticle('next');

            expect(component.currentNewsArticleIndex).toEqual(2);
        });

        it('should reset currentNewsArticleIndex when argument is "next" and reached the end', () => {
            component.currentNewsArticleIndex = 5;

            component.changeNewsArticle('next');

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
        it('should call changeNewsArticle() after 1 minute', () => {
            jasmine.clock().install();
            spyOn(component, 'changeNewsArticle').and.callThrough();

            component.setNextNewsItemTimeout();

            jasmine.clock().tick(1000 * 60);

            expect(component.changeNewsArticle).toHaveBeenCalledWith('next');

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

        it('should call changeNewsArticle() on key "ArrowLeft"', () => {
            spyOn(component, 'changeNewsArticle').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowLeft');

            expect(component.changeNewsArticle).toHaveBeenCalledWith(
                'previous'
            );
        });

        it('should call changeNewsArticle() on key "ArrowRight"', () => {
            spyOn(component, 'changeNewsArticle').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('ArrowRight');

            expect(component.changeNewsArticle).toHaveBeenCalledWith('next');
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

    describe('ngOnDestroy()', () => {
        it('should unsubscribe to all subscriptions', () => {
            spyOn(component.ngUnsubscribe, 'complete');
            component.ngOnDestroy();
            expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
        });
    });
});
