import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(routes, withHashLocation()),
        provideZoneChangeDetection({ eventCoalescing: true }),
    ],
};
