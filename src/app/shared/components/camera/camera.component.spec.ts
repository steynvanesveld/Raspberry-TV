import { CameraComponent } from './camera.component';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CameraComponent', () => {
    let component: CameraComponent;
    let fixture: ComponentFixture<CameraComponent>;
    let sanitizer: DomSanitizer;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CameraComponent],
            providers: [
                {
                    useValue: { location: { hostname: 'localhost' } },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CameraComponent);
        sanitizer = TestBed.inject(DomSanitizer);
        component = fixture.componentInstance;
        component.cameraType = 'IFRAME';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('cameraSrc()', () => {
        it('should return a sanitized combination of host and port', () => {
            expect(component.cameraSrc).toEqual(
                sanitizer.bypassSecurityTrustResourceUrl(
                    component.host() + component.port(),
                ) as string,
            );
        });
    });

    describe('port()', () => {
        it('should return a value for an img', () => {
            component.cameraType = 'IMG';
            expect(component.port()).toEqual(':1339');
        });

        it('should return a value for an iframe on a local network', () => {
            spyOn(component, 'localNetwork').and.returnValue(false);
            expect(component.port()).toEqual(':1336');
        });

        it('should return a value for all other scenarios', () => {
            expect(component.port()).toEqual('');
        });
    });

    describe('host()', () => {
        it('should return local IP on a local network', () => {
            expect(component.host()).toEqual('//192.168.178.40');
        });

        it('should return part of the hostname when not on a local network', () => {
            spyOn(component, 'localNetwork').and.returnValue(false);
            expect(component.host()).toEqual('//localhost');
        });
    });
});
