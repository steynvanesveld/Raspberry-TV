import { AbstractModel } from './abstract.model';
import { OpenMeteoForecastCurrent } from './openmeteo-forecast-current.model';

export class OpenMeteoForecast extends AbstractModel {
    constructor(public current_weather: OpenMeteoForecastCurrent) {
        super();
    }
}
