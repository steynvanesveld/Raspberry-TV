import { AbstractModel } from './abstract.model';
import { WeatherWeather } from './weather-weather.model';

export class WeatherCurrent extends AbstractModel {
    constructor(
        public dt: number,
        public sunrise: number,
        public sunset: number,
        public temp: number,
        public feels_like: number,
        public pressure: number,
        public humidity: number,
        public dew_point: number,
        public uvi: number,
        public clouds: number,
        public visibility: number,
        public wind_speed: number,
        public wind_deg: number,
        public wind_gust: number,
        public weather: WeatherWeather[]
    ) {
        super();
    }
}
