import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvRoutingModule } from './tv.routing.module';
import { TvComponent } from './pages/tv/tv.component';
import { TvNewsComponent } from './components/tv-news/tv-news.component';
import { TvClockComponent } from './components/tv-clock/tv-clock.component';
import { TvRadioComponent } from './components/tv-radio/tv-radio.component';
import { TvWeatherComponent } from './components/tv-weather/tv-weather.component';
import { TvWallpaperComponent } from './components/tv-wallpaper/tv-wallpaper.component';

@NgModule({
    declarations: [
        TvComponent,
        TvNewsComponent,
        TvRadioComponent,
        TvClockComponent,
        TvWeatherComponent,
        TvWallpaperComponent,
    ],
    imports: [CommonModule, TvRoutingModule],
})
export class TvModule {}
