import { TestBed } from '@angular/core/testing';
import { TvRadioComponent } from './tv-radio.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TvRadioComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TvRadioComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TvRadioComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
