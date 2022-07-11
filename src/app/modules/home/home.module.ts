import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeSystemComponent } from './components/home-system/home-system.component';

@NgModule({
    declarations: [HomeComponent, HomeSystemComponent],
    imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
