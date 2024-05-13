import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
    public navVisible = false;

    public navItems = [
        {
            label: 'Home',
            value: '/',
        },
        {
            label: 'Tv',
            value: '/tv',
        },
    ];

    constructor(public router: Router) {}

    public navToggle(): void {
        this.navVisible = !this.navVisible;
    }
}
