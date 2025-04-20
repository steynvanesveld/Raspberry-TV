import { AbstractModel } from './abstract.model';

export class OpenMeteoForecastCurrent extends AbstractModel {
    constructor(
        public time: string,
        public interval: number,
        public temperature: number,
        public windspeed: number,
        public winddirection: number,
        public is_day: number,
        public weathercode: number,
    ) {
        super();
    }
}
