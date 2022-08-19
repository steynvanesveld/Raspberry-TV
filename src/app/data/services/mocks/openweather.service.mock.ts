import { Observable, of } from 'rxjs';
import { Weather } from '../../models/weather.model';
import { WeatherTemp } from '../../models/weather-temp.model';
import { WeatherDaily } from '../../models/weather-daily.model';
import { WeatherCurrent } from '../../models/weather-current.model';
import { WeatherWeather } from '../../models/weather-weather.model';

const weatherDaily = new WeatherDaily(
    0,
    0,
    0,
    0,
    0,
    0,
    new WeatherTemp(0, 0, 0, 0, 0, 0),
    new WeatherTemp(0, 0, 0, 0, 0, 0),
    0,
    0,
    0,
    0,
    0,
    0,
    [new WeatherWeather(801, 'Clouds', 'Cloudy', '02d')],
    0,
    0,
    0,
    0
);

const weatherDailyArray = () => {
    const daysInWeek = 7;
    const array = [];

    for (let i = 0; i < daysInWeek; i++) {
        array.push(weatherDaily);
    }

    return array;
};

export class OpenWeatherServiceMock {
    getWeather(): Observable<Weather> {
        return of(
            new Weather(
                new WeatherCurrent(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [
                    new WeatherWeather(801, 'Clouds', 'Cloudy', '02d'),
                ]),
                weatherDailyArray()
            )
        );
    }
}
