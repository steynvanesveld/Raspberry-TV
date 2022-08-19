import { SystemComponent } from './system.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RaspberryService } from 'src/app/data/services/raspberry.service';
import { RaspberryServiceMock } from 'src/app/data/services/mocks/raspberry.service.mock';

describe('SystemComponent', () => {
    let component: SystemComponent;
    let raspberryService: RaspberryService;
    let fixture: ComponentFixture<SystemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                { provide: RaspberryService, useClass: RaspberryServiceMock },
            ],
            declarations: [SystemComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemComponent);
        raspberryService = TestBed.inject(RaspberryService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getSystem()', () => {
        it('should call raspberryService.getSystem()', () => {
            spyOn(raspberryService, 'getSystem').and.callThrough();
            component.getSystem();
            expect(raspberryService.getSystem).toHaveBeenCalled();
        });

        it('should call itself after 30 seconds', () => {
            jasmine.clock().install();
            spyOn(component, 'getSystem').and.callThrough();

            component.getSystem();

            jasmine.clock().tick(1000 * 30);

            expect(component.getSystem).toHaveBeenCalledTimes(2);

            jasmine.clock().uninstall();
        });
    });

    describe('ngOnInit()', () => {
        it('should call getSystem()', () => {
            spyOn(component, 'getSystem').and.callThrough();
            component.ngOnInit();
            expect(component.getSystem).toHaveBeenCalled();
        });
    });

    describe('ngOnDestroy()', () => {
        it('should unsubscribe to all subscriptions', () => {
            spyOn(component.ngUnsubscribe, 'complete');
            component.ngOnDestroy();
            expect(component.ngUnsubscribe.complete).toHaveBeenCalled();
        });
    });
});
