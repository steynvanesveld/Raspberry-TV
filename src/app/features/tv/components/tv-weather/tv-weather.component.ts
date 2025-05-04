import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WEATHER_ICON_MAP } from '@data/constants/weather-icons';
import { OpenMeteoService } from '@data/services/openmeteo.service';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OpenMeteoForecast } from '@data/models/openmeteo-forecast.model';
import { OpenMeteoAirQuality } from '@data/models/openmeteo-airquality.model';
import { OpenMeteoAirqualityService } from '@data/services/openmeteo-airquality.service';

type PollenType =
    | 'alder_pollen'
    | 'birch_pollen'
    | 'olive_pollen'
    | 'grass_pollen'
    | 'mugwort_pollen'
    | 'ragweed_pollen';

type PollenGroup = 'tree' | 'grass' | 'weed';

@Component({
    selector: 'app-tv-weather',
    templateUrl: './tv-weather.component.html',
    styleUrl: './tv-weather.component.scss',
})
export class TvWeatherComponent implements OnInit {
    public forecast: OpenMeteoForecast | undefined;
    public airQuality: OpenMeteoAirQuality | undefined;
    public sun: { time?: string; type?: 'sunrise' | 'sunset' } = {};

    public pollenGroups: Record<PollenGroup, PollenType[]> = {
        tree: ['alder_pollen', 'birch_pollen', 'olive_pollen'],
        grass: ['grass_pollen'],
        weed: ['mugwort_pollen', 'ragweed_pollen'],
    };

    public pollenThresholds: Record<PollenType, number> = {
        alder_pollen: 150,
        birch_pollen: 300,
        olive_pollen: 100,
        grass_pollen: 100,
        mugwort_pollen: 80,
        ragweed_pollen: 20,
    };

    public destroyRef = inject(DestroyRef);

    constructor(
        private openMeteoService: OpenMeteoService,
        private openMeteoAirqualityService: OpenMeteoAirqualityService,
    ) {}

    public get weatherIcon(): string {
        if (!this.forecast) return '';

        return WEATHER_ICON_MAP[this.forecast.current_weather.weathercode][
            this.forecast.current_weather.is_day ? 'day' : 'night'
        ].image;
    }

    public pollenGroupScore(group: PollenGroup): number {
        const types = this.pollenGroups[group];
        const scores = types.map((type) => {
            const value = this.airQuality?.current[type] ?? 0;
            const max = this.pollenThresholds[type];
            return value <= 0 ? 0 : value >= max ? 10 : Math.ceil((value / max) * 10);
        });

        return Math.max(...scores);
    }

    public getWeather(): void {
        forkJoin({
            forecast: this.openMeteoService.getForecast(),
            airQuality: this.openMeteoAirqualityService.getAirQuality(),
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({ forecast, airQuality }) => {
                this.forecast = forecast;
                this.airQuality = airQuality;
            });

        setTimeout(() => this.getWeather(), 1000 * 60 * 5); // 5 minutes
    }

    public ngOnInit(): void {
        this.getWeather();
        this.setSun();
    }

    public setSun(): void {
        if (!this.forecast) {
            setTimeout(() => this.setSun(), 100);
            return;
        }

        const now = new Date().getTime();
        const { daily } = this.forecast;

        this.sun.type = 'sunrise';
        let time = daily.sunRiseTomorrow;

        if (now <= daily.sunRiseToday.getTime()) {
            time = daily.sunRiseToday;
        }

        if (now <= daily.sunSetToday.getTime()) {
            this.sun.type = 'sunset';
            time = daily.sunSetToday;
        }

        this.sun.time = time.toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        setTimeout(() => this.setSun(), 1000 * 60); // 1 minute
    }
}
