import { TestBed } from '@angular/core/testing';
import { TvClockComponent } from './tv-clock.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TvClockComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TvClockComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TvClockComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
