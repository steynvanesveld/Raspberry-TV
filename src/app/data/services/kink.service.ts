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
    public fileUrl =
        'http://playerservices.streamtheworld.com/api/livestream-redirect/';
    public fileFormat = '.mp3';

    public kinkChannels = [
        new KinkChannel('kink', '<i>K</i>INK', 'KINK'),
        new KinkChannel('kink-distortion', 'DISTORTION', 'KINK_DISTORTION'),
        new KinkChannel('kink-dna', 'CLASSICS', 'KINK_DNA'),
        new KinkChannel('kink-indie', 'INDIE', 'KINKINDIE'),
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
