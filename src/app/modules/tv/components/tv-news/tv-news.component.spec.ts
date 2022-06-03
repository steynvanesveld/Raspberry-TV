import { TestBed } from '@angular/core/testing';
import { TvNewsComponent } from './tv-news.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TvNewsComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TvNewsComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TvNewsComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
