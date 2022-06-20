import { TestBed } from '@angular/core/testing';
import { OVPVideoComponent } from './ovp-video.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OVPVideoComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [OVPVideoComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(OVPVideoComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
