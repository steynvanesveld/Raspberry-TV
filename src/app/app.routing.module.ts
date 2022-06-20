import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        loadChildren: () =>
            import('src/app/modules/home/home.module').then((m) => {
                return m.HomeModule;
            }),
    },

    {
        path: 'ovp',
        component: DefaultLayoutComponent,
        loadChildren: () =>
            import('src/app/modules/ovp/ovp.module').then((m) => {
                return m.OVPModule;
            }),
    },
    {
        path: 'tv',
        component: DefaultLayoutComponent,
        loadChildren: () =>
            import('src/app/modules/tv/tv.module').then((m) => {
                return m.TvModule;
            }),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
