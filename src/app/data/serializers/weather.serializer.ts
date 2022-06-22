import { Weather } from 'src/app/data/models/weather.model';

export class WeatherSerializer {
    public fromJson(json: Weather): Weather {
        return new Weather(
            json.weather,
            json.main,
            json.name,
            json.wind,
            json.sys
        );
    }

    public toJson(weather: Weather): object {
        return {
            weather: weather.weather,
            main: weather.main,
            name: weather.name,
            wind: weather.wind,
            sys: weather.sys,
        };
    }
}
