import { TestBed } from '@angular/core/testing';
import { TestComponent } from './test.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TestComponent],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TestComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
