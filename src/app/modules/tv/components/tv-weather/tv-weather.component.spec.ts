import { TestBed } from '@angular/core/testing';
import { TvWeatherComponent } from './tv-weather.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TvWeatherComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TvWeatherComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TvWeatherComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
