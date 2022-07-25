import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OVPRoutingModule } from './ovp.routing.module';
import { OVPComponent } from './pages/ovp/ovp.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OVPVideoComponent } from './pages/ovp-video/ovp-video.component';

@NgModule({
    declarations: [OVPComponent, OVPVideoComponent],
    imports: [CommonModule, OVPRoutingModule, FormsModule, SharedModule],
})
export class OVPModule {}
