import { Observable, of } from 'rxjs';
import { Kink } from '../../models/kink.model';
import { KinkChannel } from '../../models/kink-channel.model';

export class KinkServiceMock {
    public fileUrl = 'url';
    public fileFormat = '.mp3';

    public kinkChannels = [
        new KinkChannel('kink', 'KINK', 'KINK'),
        new KinkChannel('kink-distortion', 'DISTORTION', 'KINK_DISTORTION'),
    ];

    getNowPlaying(): Observable<Kink> {
        return of(
            new Kink(
                {
                    kink: 'Kink Song - Kink Artist',
                    'kink-distortion': 'Distortion Song - Distortion Artist',
                },
                'Kink Song - Kink Artist',
                {
                    'kink-distortion': {
                        artist: 'Distortion Artist',
                        title: 'Distortion Song',
                    },
                    kink: {
                        artist: 'Kink Artist',
                        title: 'Kink Song',
                    },
                },
                false
            )
        );
    }
}
