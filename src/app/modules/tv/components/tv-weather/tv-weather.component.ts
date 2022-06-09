import { Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/data/models/weather.model';
import { OpenWeatherService } from 'src/app/data/services/openweather.service';

@Component({
    selector: 'app-tv-weather',
    templateUrl: './tv-weather.component.html',
    styleUrls: ['./tv-weather.component.scss'],
})
export class TvWeatherComponent implements OnInit {
    @Input() public fetchDataSubject: Subject<void> | undefined;
    @Input() public showDataSubject: Subject<void> | undefined;

    public weather: Weather | undefined;

    constructor(private openWeatherService: OpenWeatherService) {}

    get icon(): string {
        return `http://openweathermap.org/img/wn/${this.weather?.weather[0].icon}@2x.png`;
    }
    get temperature(): string {
        return `${Math.round(Number(this.weather?.main.temp))}°C`;
    }

    public ngOnInit(): void {
        this.observeFetchDataSubject();
    }

    public observeFetchDataSubject(): void {
        this.fetchDataSubject?.subscribe(() => {
            this.getWeather();
        });
    }

    private getWeather(): void {
        this.openWeatherService.getWeather().subscribe((response) => {
            this.weather = response;
        });
    }
}
