import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Kink } from '../models/kink.model';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { KinkChannel } from '../models/kink-channel.model';
import { KinkSerializer } from '../serializers/kink.serializer';

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
    }

    public getNowPlaying(): Observable<Kink> {
        this.setBaseUrl('https://api.kink.nl/static');
        this.setResource('/now-playing.json');

        return this.read();
    }
}
