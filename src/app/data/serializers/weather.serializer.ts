import { Weather } from 'src/app/data/models/weather.model';

export class WeatherSerializer {
    public fromJson(json: Weather): Weather {
        return new Weather(json.current, json.daily);
    }

    public toJson(weather: Weather): object {
        return {
            current: weather.current,
            daily: weather.daily,
        };
    }
}
