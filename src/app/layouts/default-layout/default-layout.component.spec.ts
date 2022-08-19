import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultLayoutComponent } from './default-layout.component';

describe('DefaultLayoutComponent', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [DefaultLayoutComponent],
        }).compileComponents();
    });

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

    describe('toggleOVP()', () => {
        it('should add to the showOVPClicks integer so long showOVPClicks is smaller than 6', () => {
            expect(component.showOVPClicks).toEqual(0);

            for (let i = 0; i < 10; i++) {
                component.toggleOVP();
            }

            expect(component.showOVPClicks).toEqual(6);
        });

        it('should toggle showOVP when showOVPClicks is larger or equal to 6', () => {
            component.showOVPClicks = 6;

            expect(component.showOVP).toBeFalse();
            component.toggleOVP();
            expect(component.showOVP).toBeTrue();
            component.toggleOVP();
            expect(component.showOVP).toBeFalse();
        });
    });
});
