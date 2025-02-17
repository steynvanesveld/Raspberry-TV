import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrl: './default-layout.component.scss',
    imports: [CommonModule, RouterModule],
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
