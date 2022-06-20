import { Injectable } from '@angular/core';
import { Kink } from '../models/kink.model';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { KinkSerializer } from '../serializers/kink.serializer';
import { KinkChannel } from '../models/kink-channel.model';

@Injectable({
    providedIn: 'root',
})
export class KinkService extends HttpService<Kink> {
    public kinkChannels = [
        new KinkChannel(
            'Kink',
            'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK.mp3'
        ),
        new KinkChannel(
            'Kink Distortion',
            'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK_DISTORTION.mp3'
        ),
        new KinkChannel(
            'Kink DNA',
            'http://playerservices.streamtheworld.com/api/livestream-redirect/KINK_DNA.mp3'
        ),
        new KinkChannel(
            'Kink Indie',
            'http://playerservices.streamtheworld.com/api/livestream-redirect/KINKINDIE.mp3'
        ),
    ];

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
