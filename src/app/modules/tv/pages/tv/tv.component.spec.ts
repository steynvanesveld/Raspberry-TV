import { Subject } from 'rxjs';
import { TvComponent } from './tv.component';
import { Component, Input } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { KeyboardEventKey } from 'src/app/data/models/keyboard-event-key.type';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

@Component({ selector: 'app-tv-news', template: '' })
class TvNewsComponent {
    @Input() public keyDownSubject!: Subject<KeyboardEventKey>;
    @Input() public overlay!: boolean;
}

@Component({ selector: 'app-tv-radio', template: '' })
class TvRadioComponent {
    @Input() public keyDownSubject!: Subject<KeyboardEventKey>;
    @Input() public overlay!: boolean;
}

@Component({ selector: 'app-tv-clock', template: '' })
class TvClockComponent {}

@Component({ selector: 'app-tv-weather', template: '' })
class TvWeatherComponent {}

@Component({ selector: 'app-tv-wallpaper', template: '' })
class TvWallpaperComponent {
    @Input() public idle!: boolean;
    @Input() public overlay!: boolean;
}

describe('TvComponent', () => {
    let component: TvComponent;
    let fixture: ComponentFixture<TvComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
            declarations: [
                TvComponent,
                TvNewsComponent,
                TvRadioComponent,
                TvClockComponent,
                TvWeatherComponent,
                TvWallpaperComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TvComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('toggleAppVisibility()', () => {
        it('should toggle the hidden boolean', () => {
            expect(component.hidden).toBeFalse();

            component.toggleAppVisibility();

            expect(component.hidden).toBeTrue();

            component.toggleAppVisibility();

            expect(component.hidden).toBeFalse();
        });

        it('should call toggleOverlayVisibility() when overlay is true', () => {
            spyOn(component, 'toggleOverlayVisibility').and.callThrough();
            component.overlay = true;

            component.toggleAppVisibility();

            expect(component.toggleOverlayVisibility).toHaveBeenCalled();
        });
    });

    describe('toggleOverlayVisibility()', () => {
        it('should toggle the overlay boolean', () => {
            expect(component.overlay).toBeFalse();

            component.toggleOverlayVisibility();

            expect(component.overlay).toBeTrue();

            component.toggleOverlayVisibility();

            expect(component.overlay).toBeFalse();
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

        it('should call toggleOverlayVisibility() on key "Enter"', () => {
            spyOn(component, 'toggleOverlayVisibility').and.callThrough();

            component.listenForKeyDown();

            component.keyDownSubject.next('Enter');

            expect(component.toggleOverlayVisibility).toHaveBeenCalled();
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
});
