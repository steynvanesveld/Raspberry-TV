import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OpenMeteoForecast } from '@data/models/openmeteo-forecast.model';
import { OpenMeteoForecastSerializer } from '@data/serializers/openmeteo-forecast.serializer';

@Injectable({
    providedIn: 'root',
})
export class OpenMeteoService extends HttpService<OpenMeteoForecast> {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setBaseUrl('https://api.open-meteo.com/v1');
        this.setSerializer(new OpenMeteoForecastSerializer());
    }

    public getForecast(): Observable<OpenMeteoForecast> {
        this.setResource('/forecast');

        const httpParams = {
            latitude: environment.open_meteo_lat,
            longitude: environment.open_meteo_lon,
            current_weather: true,
        };

        this.setParams(httpParams);

        return this.read();
    }
}
