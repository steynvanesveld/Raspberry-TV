import { Observable, of } from 'rxjs';
import { OpenWeather } from '../../models/openweather.model';
import { OpenWeatherTemp } from '../../models/openweather-temp.model';
import { OpenWeatherDaily } from '../../models/openweather-daily.model';
import { OpenWeatherCurrent } from '../../models/openweather-current.model';
import { OpenWeatherWeather } from '../../models/openweather-weather.model';

const openweatherDaily = new OpenWeatherDaily(
    1,
    2,
    3,
    4,
    5,
    6,
    new OpenWeatherTemp(1, 2, 3, 4, 5, 6),
    new OpenWeatherTemp(1, 2, 3, 4, 5, 6),
    7,
    8,
    9,
    10,
    11,
    12,
    [new OpenWeatherWeather(801, 'Clouds', 'Cloudy', '02d')],
    13,
    14,
    15,
    16,
);

const openweatherDailyArray = () => {
    const daysInWeek = 7;
    const array = [];

    for (let i = 0; i <= daysInWeek; i++) {
        array.push(openweatherDaily);
    }

    return array;
};

export class OpenWeatherServiceMock {
    getWeather(): Observable<OpenWeather> {
        return of(
            new OpenWeather(
                new OpenWeatherCurrent(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, [
                    new OpenWeatherWeather(801, 'Clouds', 'Cloudy', '02d'),
                ]),
                openweatherDailyArray(),
            ),
        );
    }
}
