import { AbstractModel } from './abstract.model';
import { OpenMeteoAirQualityCurrent } from './openmeteo-airquality-current.model';

export class OpenMeteoAirQuality extends AbstractModel {
    constructor(public current: OpenMeteoAirQualityCurrent) {
        super();
    }
}
