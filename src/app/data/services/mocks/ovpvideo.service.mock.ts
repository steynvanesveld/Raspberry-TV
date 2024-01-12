import { Observable, of } from 'rxjs';
import { OVPVideo } from '../../models/ovp-video.model';
import { OVPVideoThumb } from '../../models/ovp-video-thumb.model';

const ovpVideoThumb = new OVPVideoThumb(0, 0, 0, 'src');

export const ovpVideoMock = new OVPVideo(
    '1',
    'title',
    'keywords',
    0,
    0,
    'url',
    'added',
    0,
    0,
    'embed',
    ovpVideoThumb,
    [ovpVideoThumb, ovpVideoThumb],
    ovpVideoThumb,
);

export class OVPVideoServiceMock {
    getOVPVideo(): Observable<OVPVideo> {
        return of(ovpVideoMock);
    }
}
