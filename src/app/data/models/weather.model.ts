import { AbstractModel } from './abstract.model';
import { WeatherMain } from './weather-main.model';
import { WeatherWeather } from './weather-weather.model';

export class Weather extends AbstractModel {
    constructor(
        public weather: WeatherWeather[],
        public main: WeatherMain,
        public name: string
    ) {
        super();
    }
}
