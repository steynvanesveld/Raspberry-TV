import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TvWallpaperComponent } from './tv-wallpaper.component';

describe('TvWallpaperComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TvWallpaperComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TvWallpaperComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
