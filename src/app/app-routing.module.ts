import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('src/app/modules/home/home.module').then((m) => {
                return m.HomeModule;
            }),
    },
    {
        path: 'tv',
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
