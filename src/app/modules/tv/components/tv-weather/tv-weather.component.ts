import { Weather } from 'src/app/data/models/weather.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { OpenWeatherService } from 'src/app/data/services/openweather.service';

@Component({
    selector: 'app-tv-weather',
    templateUrl: './tv-weather.component.html',
    styleUrl: './tv-weather.component.scss',
})
export class TvWeatherComponent implements OnInit {
    public weather: Weather | undefined;
    public sun: { time?: string; type?: 'sunrise' | 'sunset' } = {};
    public destroyRef = inject(DestroyRef);

    constructor(private openWeatherService: OpenWeatherService) {}

    public get icon(): string {
        return this.weather
            ? `http://openweathermap.org/img/wn/${this.weather.current.weather[0].icon}@2x.png`
            : '';
    }

    public get temperature(): string {
        return `${Math.round(Number(this.weather?.current.temp ?? 0))}°C`;
    }

    public get wind(): string {
        return `${Math.round(
            Number(this.weather?.current.wind_speed ?? 0 * 3.6),
        )} km/u`;
    }

    public get rotation(): string {
        return `rotate(${this.weather?.current.wind_deg ?? 0}deg)`;
    }

    public get humidity(): string {
        return `${this.weather?.current.humidity ?? 0}%`;
    }

    public setSun(): void {
        if (!this.weather) {
            setTimeout(() => {
                this.setSun();
            });
            return;
        }

        const now = new Date();
        const sunRiseToday = new Date(this.weather.daily[0].sunrise * 1000);
        const sunSetToday = new Date(this.weather.daily[0].sunset * 1000);
        const sunRiseTomorrow = new Date(this.weather.daily[1].sunrise * 1000);

        this.sun.type = 'sunrise';
        let time = sunRiseTomorrow;

        if (now.getTime() <= sunRiseToday.getTime()) {
            time = sunRiseToday;
        }

        if (now.getTime() <= sunSetToday.getTime()) {
            this.sun.type = 'sunset';
            time = sunSetToday;
        }

        this.sun.time = time.toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        setTimeout(() => {
            this.setSun();
        }, 1000 * 60); // 1 minute
    }

    public getWeather(): void {
        this.openWeatherService
            .getWeather()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this.weather = response;
            });

        setTimeout(
            () => {
                this.getWeather();
            },
            1000 * 60 * 5,
        ); // 5 minutes
    }

    public ngOnInit(): void {
        this.getWeather();
        this.setSun();
    }
}
