import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        loadChildren: () => import('@features/home/home.routes').then((x) => x.routes),
    },
    {
        path: 'tv',
        component: DefaultLayoutComponent,
        loadChildren: () => import('@features/tv/tv.routes').then((x) => x.routes),
    },
];
