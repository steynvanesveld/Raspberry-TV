import { AbstractModel } from './abstract.model';
import { OpenMeteoForecastDaily } from './openmeteo-forecast-daily.model';
import { OpenMeteoForecastCurrent } from './openmeteo-forecast-current.model';

export class OpenMeteoForecast extends AbstractModel {
    constructor(
        public current_weather: OpenMeteoForecastCurrent,
        public daily: OpenMeteoForecastDaily,
    ) {
        super();
        this.daily = new OpenMeteoForecastDaily(daily.sunrise, daily.sunset);
    }
}
