import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultLayoutComponent } from './default-layout.component';

describe('DefaultLayoutComponent', () => {
    let component: DefaultLayoutComponent;
    let fixture: ComponentFixture<DefaultLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([])],
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
});
