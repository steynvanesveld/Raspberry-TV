import { AbstractModel } from './abstract.model';
import { OpenWeatherDaily } from './openweather-daily.model';
import { OpenWeatherCurrent } from './openweather-current.model';

export class OpenWeather extends AbstractModel {
    constructor(
        public current: OpenWeatherCurrent,
        public daily: OpenWeatherDaily[],
    ) {
        super();
    }
}
