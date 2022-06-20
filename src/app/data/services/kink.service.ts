import { Injectable } from '@angular/core';
import { Kink } from '../models/kink.model';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { KinkSerializer } from '../serializers/kink.serializer';

@Injectable({
    providedIn: 'root',
})
export class KinkService extends HttpService<Kink> {
    public audioSrc =
        'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3';

    constructor(httpClient: HttpClient) {
        super(httpClient);

        this.setSerializer(new KinkSerializer());
        this.setBaseUrl('https://api.kink.nl/static');
    }

    public getNowPlaying() {
        this.setResource('/now-playing.json');

        return this.read();
    }
}
