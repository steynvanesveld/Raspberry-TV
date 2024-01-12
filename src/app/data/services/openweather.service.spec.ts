import { TestBed } from '@angular/core/testing';
import { OpenWeatherService } from './openweather.service';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OpenWeatherService', () => {
    let service: OpenWeatherService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OpenWeatherService],
        });

        service = TestBed.inject(OpenWeatherService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getWeather()', () => {
        it('should make a GET request via the abstract http class', () => {
            const abstractMethod = spyOn(service, 'read').and.callThrough();

            service.getWeather().subscribe(() => {
                expect(abstractMethod).toHaveBeenCalled();
            });

            const request = httpMock.expectOne(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${environment.open_weather_lat}&lon=${environment.open_weather_lon}&appid=${environment.open_weather_api_key}&units=metric&lang=nl&exclude=minutely,hourly,alerts`,
            );

            expect(request.request.method).toBe('GET');

            request.flush([]);
        });
    });
});
