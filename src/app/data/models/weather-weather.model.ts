import { AbstractModel } from './abstract.model';

export class WeatherWeather extends AbstractModel {
    constructor(
        public main: string,
        public description: string,
        public icon: string
    ) {
        super();
    }
}
