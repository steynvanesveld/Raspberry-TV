import { NgModule } from '@angular/core';
import { TvComponent } from './pages/tv/tv.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: TvComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TvRoutingModule {}
