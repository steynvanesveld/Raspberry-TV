import { Observable, of } from 'rxjs';
import { OVP } from '../../models/ovp.model';
import { ovpVideoMock } from './ovpvideo.service.mock';

const ovp = new OVP(1, 1, 1, 1, 1, 1, 1, [ovpVideoMock]);

export class OVPServiceMock {
    searchOVP(): Observable<OVP> {
        return of(ovp);
    }
}
