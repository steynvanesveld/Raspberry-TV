import { Component } from '@angular/core';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
    public cameraSrc = `//${window.location.hostname.split(':')[0]}:1338`;

    constructor() {}
}
