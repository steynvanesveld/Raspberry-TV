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

    private getWeather(): void {
        this.openWeatherService
            .getWeather()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.weather = response;
            });

        setTimeout(() => {
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
