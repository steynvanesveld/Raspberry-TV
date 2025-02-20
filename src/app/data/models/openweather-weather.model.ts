import { AbstractModel } from './abstract.model';

export class OpenWeatherWeather extends AbstractModel {
    constructor(
        public override id: number,
        public main: string,
        public description: string,
        public icon: string,
    ) {
        super();
    }
}
