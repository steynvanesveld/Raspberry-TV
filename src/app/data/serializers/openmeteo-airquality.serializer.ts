import { OpenMeteoAirQuality } from '@data/models/openmeteo-airquality.model';

export class OpenMeteoAirqualitySerializer {
    public fromJson(json: OpenMeteoAirQuality): OpenMeteoAirQuality {
        return new OpenMeteoAirQuality(json.current);
    }

    public toJson(openMeteoAirQuality: OpenMeteoAirQuality): object {
        return {
            current: openMeteoAirQuality.current,
        };
    }
}
