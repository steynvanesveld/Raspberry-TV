import { TestBed } from '@angular/core/testing';
import { CameraComponent } from './camera.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CameraComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CameraComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(CameraComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
