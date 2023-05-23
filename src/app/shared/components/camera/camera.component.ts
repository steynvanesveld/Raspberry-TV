import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss'],
})
export class CameraComponent {
    @Input() public cameraType!: 'IMG' | 'IFRAME';

    constructor(private sanitizer: DomSanitizer) {}

    public get cameraSrc(): string {
        return this.sanitizer.bypassSecurityTrustResourceUrl(
            this.host() + this.port()
        ) as string;
    }

    /* istanbul ignore next */
    public localNetwork(): boolean {
        return (
            window.location.hostname === 'localhost' ||
            window.location.hostname.includes('192.168.178.')
        );
    }

    public port(): string {
        return this.cameraType === 'IMG'
            ? ':1339'
            : !this.localNetwork()
            ? ':1336'
            : '';
    }

    public host(): string {
        return `//${
            this.localNetwork()
                ? '192.168.178.40'
                : window.location.hostname.split(':')[0]
        }`;
    }
}
