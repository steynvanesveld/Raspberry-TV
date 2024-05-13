import { OpenWeather } from 'src/app/data/models/openweather.model';

export class OpenWeatherSerializer {
    public fromJson(json: OpenWeather): OpenWeather {
        return new OpenWeather(json.current, json.daily);
    }

    public toJson(openweather: OpenWeather): object {
        return {
            current: openweather.current,
            daily: openweather.daily,
        };
    }
}
