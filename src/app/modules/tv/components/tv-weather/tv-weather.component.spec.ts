import { TvWeatherComponent } from './tv-weather.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OpenWeatherService } from 'src/app/data/services/openweather.service';
import { OpenWeatherServiceMock } from 'src/app/data/services/mocks/openweather.service.mock';

describe('TvWeatherComponent', () => {
    let component: TvWeatherComponent;
    let fixture: ComponentFixture<TvWeatherComponent>;
    let openWeatherService: OpenWeatherService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                {
                    provide: OpenWeatherService,
                    useClass: OpenWeatherServiceMock,
                },
            ],
            declarations: [TvWeatherComponent],
        }).compileComponents();
    });

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
            expect(component.icon).toEqual(
                'http://openweathermap.org/img/wn/02d@2x.png'
            );
        });
    });

    describe('temperature()', () => {
        it('should return current temperature in °C', () => {
            expect(component.temperature).toEqual('0°C');
        });
    });

    describe('wind()', () => {
        it('should return current wind in km/u', () => {
            expect(component.wind).toEqual('0 km/u');
        });
    });

    describe('rotation()', () => {
        it('should return current rotation in deg', () => {
            expect(component.rotation).toEqual('rotate(0deg)');
        });
    });

    describe('humidity()', () => {
        it('should return current humidity in percentage', () => {
            expect(component.humidity).toEqual('0%');
        });
    });

    describe('setSunTime()', () => {
        it('should set the sunTime variable to todays sunrise if sunrise has yet to come', () => {
            const now = new Date();
            component.weather.daily[0].sunrise = now.getTime() / 1000;

            component.setSunTime();

            expect(component.sunTime).toEqual(
                `${component.makeDoubleDigits(
                    now.getHours()
                )}:${component.makeDoubleDigits(now.getMinutes())}`
            );
        });

        it('should set the sunTime variable to todays sunset if sunrise has passed', () => {
            const now = new Date();
            component.weather.daily[0].sunrise = (now.getTime() - 1000) / 1000;
            component.weather.daily[0].sunset = now.getTime() / 1000;

            component.setSunTime();

            expect(component.sunTime).toEqual(
                `${component.makeDoubleDigits(
                    now.getHours()
                )}:${component.makeDoubleDigits(now.getMinutes())}`
            );
        });

        it('should set the sunTime variable to tomorrows sunrise if sunset has passed', () => {
            const now = new Date();
            component.weather.daily[0].sunrise = (now.getTime() - 1000) / 1000;
            component.weather.daily[0].sunset = (now.getTime() - 1000) / 1000;
            component.weather.daily[1].sunset = now.getTime() / 1000;

            component.setSunTime();

            expect(component.sunTime).toEqual(
                `${component.makeDoubleDigits(
                    now.getHours()
                )}:${component.makeDoubleDigits(now.getMinutes())}`
            );
        });
    });

    describe('makeDoubleDigits()', () => {
        it('should do nothing when the input already has double digits', () => {
            expect(component.makeDoubleDigits(10)).toEqual('10');
        });

        it('should add a prepending zero when the input is a single digit', () => {
            expect(component.makeDoubleDigits(9)).toEqual('09');
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

    describe('ngOnDestroy()', () => {
        it('should unsubscribe to all subscriptions', () => {
            spyOn(component.ngUnsubscribe, 'complete');
            component.ngOnDestroy();
            expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
        });
    });
});
