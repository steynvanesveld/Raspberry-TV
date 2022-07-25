import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamRoutingModule } from './cam.routing.module';
import { CamComponent } from './pages/cam/cam.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [CamComponent],
    imports: [CommonModule, CamRoutingModule, SharedModule],
})
export class CamModule {}
