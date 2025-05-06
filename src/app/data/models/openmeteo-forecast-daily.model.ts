import { AbstractModel } from './abstract.model';

export class OpenMeteoForecastDaily extends AbstractModel {
    public sunriseToday: string;
    public sunsetToday: string;
    public sunriseTomorrow: string;

    public sunriseTodayTimestamp: number;
    public sunsetTodayTimestamp: number;
    public sunriseTomorrowTimestamp: number;

    constructor(
        public sunrise: string[],
        public sunset: string[],
    ) {
        super();

        this.sunriseToday = this.sunrise[0].split('T')[1];
        this.sunsetToday = this.sunset[0].split('T')[1];
        this.sunriseTomorrow = this.sunrise[1].split('T')[1];

        this.sunriseTodayTimestamp = new Date(this.sunrise[0]).getTime();
        this.sunsetTodayTimestamp = new Date(this.sunset[0]).getTime();
        this.sunriseTomorrowTimestamp = new Date(this.sunrise[1]).getTime();
    }
}
