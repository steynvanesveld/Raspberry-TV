import { Observable, of } from 'rxjs';
import { Weather } from '../../models/weather.model';
import { WeatherTemp } from '../../models/weather-temp.model';
import { WeatherDaily } from '../../models/weather-daily.model';
import { WeatherCurrent } from '../../models/weather-current.model';
import { WeatherWeather } from '../../models/weather-weather.model';

const weatherDaily = new WeatherDaily(
    1,
    2,
    3,
    4,
    5,
    6,
    new WeatherTemp(1, 2, 3, 4, 5, 6),
    new WeatherTemp(1, 2, 3, 4, 5, 6),
    7,
    8,
    9,
    10,
    11,
    12,
    [new WeatherWeather(801, 'Clouds', 'Cloudy', '02d')],
    13,
    14,
    15,
    16
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
                new WeatherCurrent(
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    [new WeatherWeather(801, 'Clouds', 'Cloudy', '02d')]
                ),
                weatherDailyArray()
            )
        );
    }
}
