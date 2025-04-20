import { AbstractModel } from './abstract.model';

export class OpenMeteoAirQualityCurrent extends AbstractModel {
    constructor(
        public time: string,
        public interval: number,
        public alder_pollen: number,
        public birch_pollen: number,
        public grass_pollen: number,
        public mugwort_pollen: number,
        public olive_pollen: number,
        public ragweed_pollen: number,
    ) {
        super();
    }
}
