import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Weather } from 'src/app/data/models/weather.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OpenWeatherService } from 'src/app/data/services/openweather.service';

@Component({
    selector: 'app-tv-weather',
    templateUrl: './tv-weather.component.html',
    styleUrls: ['./tv-weather.component.scss'],
})
export class TvWeatherComponent implements OnInit, OnDestroy {
    public weather!: Weather;
    public sunTime: string | undefined;
    public ngUnsubscribe = new Subject<void>();

    constructor(private openWeatherService: OpenWeatherService) {}

    public get icon(): string {
        return `http://openweathermap.org/img/wn/${this.weather.current.weather[0].icon}@2x.png`;
    }

    public get temperature(): string {
        return `${Math.round(Number(this.weather.current.temp))}°C`;
    }

    public get wind(): string {
        return `${Math.round(
            Number(this.weather.current.wind_speed * 3.6)
        )} km/u`;
    }

    public get rotation(): string {
        return `rotate(${this.weather.current.wind_deg}deg)`;
    }

    public get humidity(): string {
        return `${this.weather.current.humidity}%`;
    }

    public setSunTime(): void {
        if (!this.weather) {
            setTimeout(() => {
                this.setSunTime();
            });
            return;
        }

        const now = new Date();
        const sunRiseToday = new Date(this.weather.daily[0].sunrise * 1000);
        const sunSetToday = new Date(this.weather.daily[0].sunset * 1000);
        const sunRiseTomorrow = new Date(this.weather.daily[1].sunrise * 1000);
        const sunTime =
            now.getTime() <= sunRiseToday.getTime()
                ? sunRiseToday
                : now.getTime() <= sunSetToday.getTime()
                ? sunSetToday
                : sunRiseTomorrow;

        this.sunTime = sunTime.toLocaleString('nl-NL', {
            hour: '2-digit',
            minute: '2-digit',
        });

        setTimeout(() => {
            this.setSunTime();
        }, 1000 * 60); // 1 minute
    }

    public getWeather(): void {
        this.openWeatherService
            .getWeather()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.weather = response;
            });

        setTimeout(() => {
            this.getWeather();
        }, 1000 * 60 * 5); // 5 minutes
    }

    public ngOnInit(): void {
        this.getWeather();
        this.setSunTime();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
