import { TestBed } from '@angular/core/testing';
import { HomeSystemComponent } from './home-system.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeSystemComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [HomeSystemComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(HomeSystemComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
