import { AbstractModel } from './abstract.model';

export class OpenMeteoForecastDaily extends AbstractModel {
    constructor(
        public sunrise: string[],
        public sunset: string[],
    ) {
        super();
    }

    get sunRiseToday(): Date {
        return new Date(this.sunrise[0]);
    }

    get sunSetToday(): Date {
        return new Date(this.sunset[0]);
    }

    get sunRiseTomorrow(): Date {
        return new Date(this.sunrise[1]);
    }
}
