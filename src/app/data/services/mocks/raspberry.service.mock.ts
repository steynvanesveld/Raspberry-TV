import { Observable, of } from 'rxjs';
import { System } from '../../models/system.model';
import { Favorites } from '../../models/favorites.model';

export const favorites = new Favorites(['', 'foo', 'bar']);

export class RaspberryServiceMock {
    getSystem(): Observable<System> {
        return of(
            new System('Raspberry Pi 3', '10%', '0.1, 0.5, 1.0', '69&deg;C'),
        );
    }

    getFavorites(): Observable<Favorites> {
        return of(favorites);
    }

    setFavorite(): Observable<Favorites> {
        return of(favorites);
    }
}
