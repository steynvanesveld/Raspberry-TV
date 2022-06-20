import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OVPComponent } from './pages/ovp/ovp.component';
import { OVPVideoComponent } from './pages/ovp-video/ovp-video.component';

const routes: Routes = [
    { path: '', component: OVPComponent },
    { path: ':id', component: OVPVideoComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OVPRoutingModule {}
