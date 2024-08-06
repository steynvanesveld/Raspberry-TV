import { TvClockComponent } from './tv-clock.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TvClockComponent', () => {
    let component: TvClockComponent;
    let fixture: ComponentFixture<TvClockComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
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

    describe('getDateTime()', () => {
        it('should set the date & time variables', () => {
            component.date = '';
            component.time = '';

            component.getDateTime();

            expect(component.date).not.toEqual('');
            expect(component.time).not.toEqual('');
        });

        it('should call itself after 100 milliseconds', () => {
            jasmine.clock().install();

            spyOn(component, 'getDateTime').and.callThrough();

            component.getDateTime();

            jasmine.clock().tick(100);

            expect(component.getDateTime).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('ngOnInit()', () => {
        it('should call getDateTime()', () => {
            spyOn(component, 'getDateTime').and.callThrough();
            component.ngOnInit();
            expect(component.getDateTime).toHaveBeenCalled();
        });
    });
});
