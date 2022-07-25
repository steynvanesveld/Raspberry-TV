import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamComponent } from './pages/cam/cam.component';

const routes: Routes = [{ path: '', component: CamComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CamRoutingModule {}
