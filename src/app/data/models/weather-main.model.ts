import { AbstractModel } from './abstract.model';

export class WeatherMain extends AbstractModel {
    constructor(
        public temp: string,
        public feels_like: string,
        public temp_min: string,
        public temp_max: string,
        public pressure: string,
        public humidity: string
    ) {
        super();
    }
}
