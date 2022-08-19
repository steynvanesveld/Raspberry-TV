import { Component } from '@angular/core';
import { CamComponent } from './cam.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({ selector: 'app-camera', template: '' })
class CameraComponent {}

describe('CamComponent', () => {
    let component: CamComponent;
    let fixture: ComponentFixture<CamComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [CamComponent, CameraComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
