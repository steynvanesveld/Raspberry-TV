import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
    constructor(private sanitizer: DomSanitizer) {}

    public get cameraSrc(): string {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            `//${window.location.hostname.split(':')[0]}:1336`
        ) as string;
    }
}
