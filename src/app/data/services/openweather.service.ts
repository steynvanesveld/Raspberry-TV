import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';
import { environment } from 'src/environments/environment';
import { WeatherSerializer } from '../serializers/weather.serializer';

@Injectable({
    providedIn: 'root',
})
export class OpenWeatherService extends HttpService<Weather> {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setBaseUrl('https://api.openweathermap.org/data/2.5');
    }

    public getWeather() {
        this.setResource('/weather');

        const httpParams = {
            lat: environment.open_weather_lat,
            lon: environment.open_weather_lon,
            appid: environment.open_weather_api_key,
            units: 'metric',
        };

        this.setParams(httpParams);
        this.setSerializer(new WeatherSerializer());

        return this.read();
    }
}
