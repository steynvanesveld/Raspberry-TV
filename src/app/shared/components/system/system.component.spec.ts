import { TestBed } from '@angular/core/testing';
import { SystemComponent } from './system.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SystemComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [SystemComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(SystemComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
