import { AbstractModel } from './abstract.model';

export class WeatherTemp extends AbstractModel {
    constructor(
        public day: number,
        public min: number,
        public max: number,
        public night: number,
        public eve: number,
        public morn: number,
    ) {
        super();
    }
}
