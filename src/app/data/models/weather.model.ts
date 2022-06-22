import { AbstractModel } from './abstract.model';
import { WeatherSys } from './weather-sys.model';
import { WeatherMain } from './weather-main.model';
import { WeatherWind } from './weather-wind.model';
import { WeatherWeather } from './weather-weather.model';

export class Weather extends AbstractModel {
    constructor(
        public weather: WeatherWeather[],
        public main: WeatherMain,
        public name: string,
        public wind: WeatherWind,
        public sys: WeatherSys
    ) {
        super();
    }
}
