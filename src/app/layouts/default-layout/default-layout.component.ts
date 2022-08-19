import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
    public navVisible = false;
    public showOVP = false;
    public showOVPClicks = 0;

    public navItems = [
        {
            label: 'Home',
            value: '/',
            internal: true,
        },
        {
            label: 'Camera',
            value: '/camera',
            internal: true,
        },
        {
            label: 'Tv',
            value: '/tv',
            internal: true,
        },
        {
            label: 'OVP',
            value: '/ovp',
            internal: true,
        },
    ];

    constructor(public router: Router) {}

    public navToggle(): void {
        this.navVisible = !this.navVisible;
    }

    public toggleOVP(): void {
        if (this.showOVPClicks < 6) {
            this.showOVPClicks++;
            return;
        }

        this.showOVP = !this.showOVP;
    }
}
