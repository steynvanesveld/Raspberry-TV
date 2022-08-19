import { TestBed } from '@angular/core/testing';
import { Weather } from '../models/weather.model';
import { WeatherSerializer } from './weather.serializer';
import { RouterTestingModule } from '@angular/router/testing';
import { OpenWeatherServiceMock } from '../services/mocks/openweather.service.mock';

describe('WeatherSerializer', () => {
    let serializer: WeatherSerializer;
    const mock = new OpenWeatherServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [WeatherSerializer],
        });

        serializer = TestBed.inject(WeatherSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getWeather().subscribe((data: Weather) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getWeather().subscribe((data: Weather) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
