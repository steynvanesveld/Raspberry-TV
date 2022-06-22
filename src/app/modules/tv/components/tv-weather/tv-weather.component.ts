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
    public ngUnsubscribe = new Subject<void>();

    constructor(private openWeatherService: OpenWeatherService) {}

    public get icon(): string {
        return `http://openweathermap.org/img/wn/${this.weather?.weather[0].icon}@2x.png`;
    }

    public get temperature(): string {
        return `${Math.round(Number(this.weather?.main.temp))}°C`;
    }

    public get wind(): string {
        return `${Math.round(Number(this.weather?.wind.speed * 3.6))} km/u`;
    }

    public get rotation(): string {
        return `rotate(${this.weather.wind.deg}deg)`;
    }

    public get humidity(): string {
        return `${this.weather?.main.humidity}%`;
    }

    public get sunSet(): string {
        const date = new Date(this.weather?.sys.sunset * 1000);
        const hours = this.makeDoubleDigits(date.getHours());
        const minutes = this.makeDoubleDigits(date.getMinutes());

        return `${hours}:${minutes}`;
    }

    private makeDoubleDigits(i: number): string {
        let j = i.toString();

        if (i < 10) {
            j = `0${i}`;
        }

        return j;
    }

    private getWeather(): void {
        this.openWeatherService
            .getWeather()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.weather = response;
            });

        window.setTimeout(() => {
            this.getWeather();
        }, 1000 * 60 * 10); // 10 minutes
    }

    public ngOnInit(): void {
        this.getWeather();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
