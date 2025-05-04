import { OpenMeteoForecast } from '@data/models/openmeteo-forecast.model';

export class OpenMeteoForecastSerializer {
    public fromJson(json: OpenMeteoForecast): OpenMeteoForecast {
        return new OpenMeteoForecast(json.current_weather, json.daily);
    }

    public toJson(openMeteoForecast: OpenMeteoForecast): object {
        return {
            current_weather: openMeteoForecast.current_weather,
            daily: openMeteoForecast.daily,
        };
    }
}
