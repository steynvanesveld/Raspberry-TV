import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        loadChildren: () =>
            import('src/app/modules/cam/cam.module').then((m) => {
                return m.CamModule;
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
    {
        path: 'ovp',
        component: DefaultLayoutComponent,
        loadChildren: () =>
            import('src/app/modules/ovp/ovp.module').then((m) => {
                return m.OVPModule;
            }),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
