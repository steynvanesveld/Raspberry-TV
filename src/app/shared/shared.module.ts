import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './components/camera/camera.component';
import { SystemComponent } from './components/system/system.component';

@NgModule({
    declarations: [CameraComponent, SystemComponent],
    imports: [CommonModule],
    exports: [CameraComponent, SystemComponent],
})
export class SharedModule {}
