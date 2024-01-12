import { AbstractModel } from './abstract.model';
import { WeatherTemp } from './weather-temp.model';
import { WeatherWeather } from './weather-weather.model';

export class WeatherDaily extends AbstractModel {
    constructor(
        public dt: number,
        public sunrise: number,
        public sunset: number,
        public moonrise: number,
        public moonset: number,
        public moon_phase: number,
        public temp: WeatherTemp,
        public feels_like: WeatherTemp,
        public pressure: number,
        public humidity: number,
        public dew_point: number,
        public wind_speed: number,
        public wind_deg: number,
        public wind_gust: number,
        public weather: WeatherWeather[],
        public clouds: number,
        public pop: number,
        public rain: number,
        public uvi: number,
    ) {
        super();
    }
}
