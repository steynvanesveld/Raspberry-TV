import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvRoutingModule } from './tv.routing.module';
import { TvComponent } from './components/tv/tv.component';
import { TvClockComponent } from './components/tv-clock/tv-clock.component';
import { TvWeatherComponent } from './components/tv-weather/tv-weather.component';
import { TvWallpaperComponent } from './components/tv-wallpaper/tv-wallpaper.component';

@NgModule({
    declarations: [
        TvComponent,
        TvClockComponent,
        TvWeatherComponent,
        TvWallpaperComponent,
    ],
    imports: [CommonModule, TvRoutingModule],
})
export class TvModule {}
