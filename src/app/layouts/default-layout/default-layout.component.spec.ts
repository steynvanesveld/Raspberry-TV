import { RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('DefaultLayoutComponent', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([]), DefaultLayoutComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('navToggle()', () => {
        it('should toggle the navVisible variable', () => {
            expect(component.navVisible).toBeFalse();
            component.navToggle();
            expect(component.navVisible).toBeTrue();
            component.navToggle();
            expect(component.navVisible).toBeFalse();
        });
    });
});
