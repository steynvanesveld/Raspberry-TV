import { Subject } from 'rxjs';
import { TvComponent } from './tv.component';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';

@Component({ selector: 'app-tv-news', template: '' })
class TvNewsComponent {
    @Input() public keyDownSubject!: Subject<KeyboardEventKey>;
}

@Component({ selector: 'app-camera', template: '' })
class CameraComponent {}

@Component({ selector: 'app-tv-radio', template: '' })
class TvRadioComponent {
    @Input() public keyDownSubject!: Subject<KeyboardEventKey>;
}

@Component({ selector: 'app-tv-clock', template: '' })
class TvClockComponent {}

@Component({ selector: 'app-tv-weather', template: '' })
class TvWeatherComponent {}

@Component({ selector: 'app-tv-wallpaper', template: '' })
class TvWallpaperComponent {
    @Input() public idle!: boolean;
}

describe('TvComponent', () => {
    let component: TvComponent;
    let fixture: ComponentFixture<TvComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            declarations: [
                TvComponent,
                TvNewsComponent,
                CameraComponent,
                TvRadioComponent,
                TvClockComponent,
                TvWeatherComponent,
                TvWallpaperComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TvComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('toggleCameraVisibility()', () => {
        it('should toggle the showCamera boolean', () => {
            expect(component.showCamera).toBeFalse();

            component.toggleCameraVisibility();

            expect(component.showCamera).toBeTrue();

            component.toggleCameraVisibility();

            expect(component.showCamera).toBeFalse();
        });
    });

    describe('setIdleTimeout()', () => {
        it('should always set idle to false', () => {
            component.idle = true;
            component.setIdleTimeout(0);
            expect(component.idle).toBeFalse();
        });

        it('should always set idle back to true after the timeout', () => {
            const ms = 1000;
            jasmine.clock().install();
            component.idle = true;
            component.setIdleTimeout(ms);
            jasmine.clock().tick(ms);
            expect(component.idle).toBeTrue();
            jasmine.clock().uninstall();
        });
    });

    describe('listenForKeyDown()', () => {
        it('should call toggleAppVisibility() on key "Backspace"', () => {
            spyOn(component, 'toggleAppVisibility').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('Backspace');

            expect(component.toggleAppVisibility).toHaveBeenCalled();
        });

        it('should call toggleAppVisibility() on key "6"', () => {
            spyOn(component, 'toggleCameraVisibility').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('6');

            expect(component.toggleCameraVisibility).toHaveBeenCalled();
        });
    });

    describe('listenForEvents()', () => {
        const ms = 1000 * 5;

        it('should call setIdleTimeout()', () => {
            spyOn(component, 'setIdleTimeout');
            component.listenForEvents();
            expect(component.setIdleTimeout).toHaveBeenCalledWith(ms);
        });

        it('should call setIdleTimeout() after click event', () => {
            const event = new Event('click');

            spyOn(component, 'setIdleTimeout');

            component.listenForEvents();
            window.dispatchEvent(event);

            expect(component.setIdleTimeout).toHaveBeenCalledTimes(3);
        });

        it('should call setIdleTimeout() after mousemove event', () => {
            const event = new Event('mousemove');

            spyOn(component, 'setIdleTimeout');

            component.listenForEvents();
            window.dispatchEvent(event);

            expect(component.setIdleTimeout).toHaveBeenCalledTimes(3);
        });

        it('should call keyDownSubject.next() after keyboard event', () => {
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            spyOn(component.keyDownSubject, 'next');

            component.listenForEvents();
            window.dispatchEvent(event);

            expect(component.keyDownSubject.next).toHaveBeenCalledWith('Enter');
        });
    });

    describe('ngOnInit()', () => {
        it('should call listenForEvents()', () => {
            spyOn(component, 'listenForEvents').and.callThrough();
            component.ngOnInit();
            expect(component.listenForEvents).toHaveBeenCalled();
        });

        it('should call listenForKeyDown()', () => {
            spyOn(component, 'listenForKeyDown').and.callThrough();
            component.ngOnInit();
            expect(component.listenForKeyDown).toHaveBeenCalled();
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
