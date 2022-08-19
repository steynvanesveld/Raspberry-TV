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
        const now = new Date();
        const sunRiseToday = new Date(this.weather.daily[0].sunrise * 1000);
        const sunSetToday = new Date(this.weather.daily[0].sunset * 1000);
        const sunRiseTomorrow = new Date(this.weather.daily[1].sunrise * 1000);

        let hours: number;
        let minutes: number;

        if (now.getTime() <= sunRiseToday.getTime()) {
            hours = sunRiseToday.getHours();
            minutes = sunRiseToday.getMinutes();
        } else if (now.getTime() <= sunSetToday.getTime()) {
            hours = sunSetToday.getHours();
            minutes = sunSetToday.getMinutes();
        } else {
            hours = sunRiseTomorrow.getHours();
            minutes = sunRiseTomorrow.getMinutes();
        }

        this.sunTime = `${this.makeDoubleDigits(hours)}:${this.makeDoubleDigits(
            minutes
        )}`;
    }

    public makeDoubleDigits(i: number): string {
        let j = i.toString();

        if (i < 10) {
            j = `0${i}`;
        }

        return j;
    }

    public getWeather(): void {
        this.openWeatherService
            .getWeather()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.weather = response;
                this.setSunTime();
            });

        window.setTimeout(() => {
            this.getWeather();
        }, 1000 * 60 * 5); // 5 minutes
    }

    public ngOnInit(): void {
        this.getWeather();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
