import { OVPComponent } from './ovp.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('OVPComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [OVPComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(OVPComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
