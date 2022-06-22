import { AbstractModel } from './abstract.model';

export class WeatherSys extends AbstractModel {
    constructor(public sunrise: number, public sunset: number) {
        super();
    }
}
