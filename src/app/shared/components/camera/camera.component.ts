import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
    public cameraSrc =
        (environment.production
            ? '//' + window.location.hostname.split(':')[0]
            : environment.raspberry_host) + ':1338';

    constructor() {}
}
