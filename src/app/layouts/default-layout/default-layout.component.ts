import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
    public navVisible = false;

    public navItems = [
        {
            label: 'Home',
            value: '/',
        },

        {
            label: 'Test',
            value: '/test',
        },
        {
            label: 'Tv',
            value: '/tv',
        },
    ];

    public navToggle(): void {
        this.navVisible = !this.navVisible;
    }

    public prepareRoute(outlet: RouterOutlet): void {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData['animation']
        );
    }
}
