import { AbstractModel } from './abstract.model';
import { WeatherDaily } from './weather-daily.model';
import { WeatherCurrent } from './weather-current.model';

export class Weather extends AbstractModel {
    constructor(
        public current: WeatherCurrent,
        public daily: WeatherDaily[],
    ) {
        super();
    }
}
