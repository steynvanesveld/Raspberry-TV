import { provideHttpClient } from '@angular/common/http';
import { TvWeatherComponent } from './tv-weather.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OpenWeatherService } from '@data/services/openmeteo.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OpenWeatherServiceMock } from '@data/services/mocks/openweather.service.mock';

describe('TvWeatherComponent', () => {
    let component: TvWeatherComponent;
    let fixture: ComponentFixture<TvWeatherComponent>;
    let openWeatherService: OpenWeatherService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TvWeatherComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: OpenWeatherService,
                    useClass: OpenWeatherServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TvWeatherComponent);
        openWeatherService = TestBed.inject(OpenWeatherService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('icon()', () => {
        it('should return current icon', () => {
            expect(component.icon).toEqual('http://openweathermap.org/img/wn/02d@2x.png');
        });

        it('should return empty string is weather is undefined', () => {
            component.weather = undefined;
            expect(component.icon).toEqual('');
        });
    });

    describe('temperature()', () => {
        it('should return current temperature in °C', () => {
            expect(component.temperature).toEqual('4°C');
        });

        it('should return fallback in °C if weather is undefined', () => {
            component.weather = undefined;
            expect(component.temperature).toEqual('0°C');
        });
    });

    describe('wind()', () => {
        it('should return current wind in km/u', () => {
            expect(component.wind).toEqual('12 km/u');
        });

        it('should return fallback in km/u if weather is undefined', () => {
            component.weather = undefined;
            expect(component.wind).toEqual('0 km/u');
        });
    });

    describe('rotation()', () => {
        it('should return current rotation in deg', () => {
            expect(component.rotation).toEqual('rotate(13deg)');
        });

        it('should return fallback in deg if weather is undefined', () => {
            component.weather = undefined;
            expect(component.rotation).toEqual('rotate(0deg)');
        });
    });

    describe('humidity()', () => {
        it('should return current humidity in percentage', () => {
            expect(component.humidity).toEqual('7%');
        });

        it('should return fallback in percentage if weather is undefined', () => {
            component.weather = undefined;
            expect(component.humidity).toEqual('0%');
        });
    });

    describe('setSun()', () => {
        it('should call itself if weather is undefined', () => {
            jasmine.clock().install();

            spyOn(component, 'setSun').and.callThrough();
            component.weather = undefined;

            component.setSun();

            jasmine.clock().tick(0);

            expect(component.setSun).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });

        it('should set the sun variable to todays sunrise if sunrise has yet to come', () => {
            const now = new Date();
            const time = now.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            });

            component.weather!.daily[0].sunrise = now.getTime() / 1000;

            component.setSun();

            expect(component.sun).toEqual({
                time,
                type: 'sunrise',
            });
        });

        it('should set the sun variable to todays sunset if todays sunrise has passed', () => {
            const now = new Date();
            const time = now.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            });

            component.weather!.daily[0].sunrise = (now.getTime() - 1000) / 1000;
            component.weather!.daily[0].sunset = now.getTime() / 1000;

            component.setSun();

            expect(component.sun).toEqual({
                time,
                type: 'sunset',
            });
        });

        it('should set the sun variable to tomorrows sunrise if todays sunrise and sunset have passed', () => {
            const now = new Date();
            const time = now.toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
            });

            component.weather!.daily[1].sunset = now.getTime() / 1000;
            component.weather!.daily[0].sunrise = (now.getTime() - 1000) / 1000;
            component.weather!.daily[0].sunset = (now.getTime() - 1000) / 1000;

            component.setSun();

            expect(component.sun).toEqual({
                time,
                type: 'sunrise',
            });
        });

        it('should call itself after 1 minute', () => {
            jasmine.clock().install();

            spyOn(component, 'setSun').and.callThrough();

            component.setSun();

            jasmine.clock().tick(1000 * 60);

            expect(component.setSun).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('getWeather()', () => {
        it('should call openWeatherService.getWeather()', () => {
            spyOn(openWeatherService, 'getWeather').and.callThrough();

            component.getWeather();

            expect(openWeatherService.getWeather).toHaveBeenCalled();
        });

        it('should call itself after 5 minutes', () => {
            jasmine.clock().install();
            spyOn(component, 'getWeather').and.callThrough();

            component.getWeather();

            jasmine.clock().tick(1000 * 60 * 5);

            expect(component.getWeather).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('ngOnInit()', () => {
        it('should call getWeather()', () => {
            spyOn(component, 'getWeather').and.callThrough();
            component.ngOnInit();
            expect(component.getWeather).toHaveBeenCalled();
        });
    });
});
