import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { OpenWeather } from '../models/openweather.model';
import { environment } from 'src/environments/environment';
import { OpenWeatherSerializer } from '../serializers/openweather.serializer';

@Injectable({
    providedIn: 'root',
})
export class OpenWeatherService extends HttpService<OpenWeather> {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setSerializer(new OpenWeatherSerializer());
        this.setBaseUrl('https://api.openweathermap.org/data/2.5');
    }

    public getWeather(): Observable<OpenWeather> {
        this.setResource('/onecall');

        const httpParams = {
            lat: environment.open_weather_lat,
            lon: environment.open_weather_lon,
            appid: environment.open_weather_api_key,
            units: 'metric',
            lang: 'nl',
            exclude: 'minutely,hourly,alerts',
        };

        this.setParams(httpParams);

        return this.read();
    }
}
