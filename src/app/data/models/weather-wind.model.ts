import { AbstractModel } from './abstract.model';

export class WeatherWind extends AbstractModel {
    constructor(public deg: number, public gust: number, public speed: number) {
        super();
    }
}
