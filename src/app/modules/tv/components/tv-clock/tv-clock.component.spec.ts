import { TvClockComponent } from './tv-clock.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TvClockComponent', () => {
    let component: TvClockComponent;
    let fixture: ComponentFixture<TvClockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [TvClockComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TvClockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getTime()', () => {
        it('should set the time variable', () => {
            component.time = '';

            component.getTime();

            expect(component.time).not.toEqual('');
        });

        it('should call itself after 100 milliseconds', () => {
            jasmine.clock().install();

            spyOn(component, 'getTime').and.callThrough();

            component.getTime();

            jasmine.clock().tick(100);

            expect(component.getTime).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('makeDoubleDigits()', () => {
        it('should do nothing when the input already has double digits', () => {
            expect(component.makeDoubleDigits(10)).toEqual('10');
        });

        it('should add a prepending zero when the input is a single digit', () => {
            expect(component.makeDoubleDigits(9)).toEqual('09');
        });
    });

    describe('ngOnInit()', () => {
        it('should call getTime()', () => {
            spyOn(component, 'getTime').and.callThrough();
            component.ngOnInit();
            expect(component.getTime).toHaveBeenCalled();
        });
    });
});
