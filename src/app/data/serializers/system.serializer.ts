import { System } from '../models/system.model';

export class SystemSerializer {
    public fromJson(json: System): System {
        return new System(json.model, json.ram_usage, json.load, json.temp);
    }

    public toJson(system: System): object {
        return {
            model: system.model,
            ram_usage: system.ram_usage,
            load: system.load,
            temp: system.temp,
        };
    }
}
