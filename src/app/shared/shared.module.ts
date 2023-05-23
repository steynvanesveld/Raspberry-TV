import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './components/camera/camera.component';

@NgModule({
    declarations: [CameraComponent],
    imports: [CommonModule],
    exports: [CameraComponent],
})
export class SharedModule {}
