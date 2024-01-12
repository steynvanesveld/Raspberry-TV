import { Rss } from '../models/rss.model';
import { TestBed } from '@angular/core/testing';
import { RssSerializer } from './rss.serializer';
import { RssItem } from '../models/rss-item.model';
import { RouterTestingModule } from '@angular/router/testing';
import { RssServiceMock } from '../services/mocks/rss.service.mock';

describe('RssSerializer', () => {
    let serializer: RssSerializer;
    const mock = new RssServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [RssSerializer],
        });

        serializer = TestBed.inject(RssSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getRss().subscribe((data) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should return empty RSS on faulty input', () => {
        expect(serializer.fromJson(null as unknown as Rss)).toEqual(
            new Rss([]),
        );
    });

    it('should serialize from model to json', () => {
        mock.getRss().subscribe((data: Rss) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });

    describe('dateTime()', () => {
        it('should return specific string for today', () => {
            const date = new Date();

            const time = `om ${date.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            })}`;

            expect(serializer.dateTime(date)).toEqual(`Vandaag ${time}`);
        });

        it('should return specific string for yesterday', () => {
            const date = new Date();

            date.setDate(date.getDate() - 1);

            const time = `om ${date.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            })}`;

            expect(serializer.dateTime(date)).toEqual(`Gisteren ${time}`);
        });

        it('should return specific string for ereyesterday', () => {
            const date = new Date();

            date.setDate(date.getDate() - 2);

            const time = `om ${date.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            })}`;

            expect(serializer.dateTime(date)).toEqual(`Eergisteren ${time}`);
        });

        it('should return specific string any other day', () => {
            const date = new Date();

            date.setDate(date.getDate() - 3);

            const time = `om ${date.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            })}`;

            expect(serializer.dateTime(date)).toEqual(
                `${date.toLocaleDateString('nl-NL', {
                    day: 'numeric',
                    month: 'short',
                })} ${time}`,
            );
        });
    });

    describe('findItems()', () => {
        it('should find items from the XML', () => {
            expect(serializer.findItems(mock.xmlVersion1)).toEqual([
                new RssItem(
                    '<p>Description</p>',
                    new Date(0),
                    'Item title',
                    'https://item.link',
                    '1 jan om 01:00',
                ),
            ]);
        });

        it('should have fallback for an empty xml', () => {
            expect(serializer.findItems(mock.xmlEmpty)).toEqual([
                new RssItem('', new Date(0), '', '', '1 jan om 01:00'),
            ]);
        });

        it('should find items from the first HTML structure', () => {
            expect(serializer.findItems(mock.htmlVersion1)).toEqual([
                new RssItem('<p>Description</p>', new Date(0)),
            ]);
        });

        it('should find items from the recond HTML structure', () => {
            expect(serializer.findItems(mock.htmlVersion2)).toEqual([
                new RssItem('<p>Description</p>', new Date(0)),
            ]);
        });

        it('should have fallback for an empty HTML', () => {
            expect(serializer.findItems(mock.htmlEmpty)).toEqual([
                new RssItem('', new Date(0)),
            ]);
        });
    });

    describe('getTextFromElement()', () => {
        it('should strip description from html and/or xml', () => {
            const html = new window.DOMParser().parseFromString(
                mock.htmlVersion1,
                'text/html',
            );

            expect(
                serializer.getTextFromElement(html, '.article-page__body'),
            ).toEqual('<p>Description</p>');
        });
    });
});
