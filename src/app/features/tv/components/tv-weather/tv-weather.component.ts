import { forkJoin, interval } from 'rxjs';
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

    public pollenThresholds: Record<PollenType, number[]> = {
        alder_pollen: [0, 2, 5, 10, 20, 35, 60, 90, 120, 140, 150],
        birch_pollen: [0, 2, 5, 10, 20, 35, 60, 90, 150, 200, 250],
        olive_pollen: [0, 1, 3, 5, 10, 17, 30, 40, 60, 80, 100],
        grass_pollen: [0, 1, 3, 5, 10, 20, 40, 60, 80, 90, 100],
        mugwort_pollen: [0, 0.5, 1, 2, 3, 5, 10, 20, 40, 60, 80],
        ragweed_pollen: [0, 0.2, 0.5, 1, 2, 3, 5, 10, 20, 40, 50],
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
        return Math.max(
            ...this.pollenGroups[group].map((pollenType) => {
                const value = this.airQuality!.current[pollenType];
                const thresholds = this.pollenThresholds[pollenType];

                return value > thresholds[thresholds.length - 1]
                    ? 10
                    : thresholds.findLastIndex((threshold) => value >= threshold);
            }),
        );
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
                this.setSun();
            });
    }

    public ngOnInit(): void {
        this.getWeather();

        interval(1000 * 60 * 5) // 5 minutes
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.getWeather());
    }

    public setSun(): void {
        const now = new Date().getTime();
        const { daily } = this.forecast!;

        this.sun = {
            type: 'sunrise',
            time: daily.sunriseTomorrow,
        };

        if (now <= daily.sunriseTodayTimestamp) {
            this.sun = {
                type: 'sunrise',
                time: daily.sunriseToday,
            };
        }

        if (now <= daily.sunsetTodayTimestamp) {
            this.sun = {
                type: 'sunset',
                time: daily.sunsetToday,
            };
        }
    }
}
