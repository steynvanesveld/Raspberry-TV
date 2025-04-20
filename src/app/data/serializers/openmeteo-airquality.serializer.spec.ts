import { TestBed } from '@angular/core/testing';
import { OpenWeather } from '../models/openmeteo-forecast.model';
import { OpenWeatherSerializer } from './openmeteo-forecast.serializer';
import { OpenWeatherServiceMock } from '../services/mocks/openweather.service.mock';

describe('OpenWeatherSerializer', () => {
    let serializer: OpenWeatherSerializer;
    const mock = new OpenWeatherServiceMock();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OpenWeatherSerializer],
        });

        serializer = TestBed.inject(OpenWeatherSerializer);
    });

    it('should be created', () => {
        expect(serializer).toBeTruthy();
    });

    it('should serialize from json to model', () => {
        mock.getWeather().subscribe((data: OpenWeather) => {
            expect(serializer.fromJson(data)).toEqual(data);
        });
    });

    it('should serialize from model to json', () => {
        mock.getWeather().subscribe((data: OpenWeather) => {
            expect(typeof serializer.toJson(data)).toBe('object');
        });
    });
});
