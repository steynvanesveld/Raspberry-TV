import { AbstractModel } from './abstract.model';
import { OpenWeatherTemp } from './openweather-temp.model';
import { OpenWeatherWeather } from './openweather-weather.model';

export class OpenWeatherDaily extends AbstractModel {
    constructor(
        public dt: number,
        public sunrise: number,
        public sunset: number,
        public moonrise: number,
        public moonset: number,
        public moon_phase: number,
        public temp: OpenWeatherTemp,
        public feels_like: OpenWeatherTemp,
        public pressure: number,
        public humidity: number,
        public dew_point: number,
        public wind_speed: number,
        public wind_deg: number,
        public wind_gust: number,
        public weather: OpenWeatherWeather[],
        public clouds: number,
        public pop: number,
        public rain: number,
        public uvi: number,
    ) {
        super();
    }
}
