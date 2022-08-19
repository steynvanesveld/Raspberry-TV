import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { System } from '../models/system.model';
import { Favorites } from '../models/favorites.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemSerializer } from '../serializers/system.serializer';
import { FavoritesSerializer } from '../serializers/favorites.serializer';

@Injectable({
    providedIn: 'root',
})
export class RaspberryService extends HttpService<any> {
    constructor(httpClient: HttpClient) {
        super(httpClient);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        this.setHeaders(new HttpHeaders(headers));
        this.setBaseUrl(environment.raspberry_host + '/api/');
    }

    public getSystem(): Observable<System> {
        this.setSerializer(new SystemSerializer());
        this.setResource('system.php');
        return this.read();
    }

    public getFavorites(): Observable<Favorites> {
        this.setSerializer(new FavoritesSerializer());
        this.setResource('favorites.php');
        return this.read();
    }

    public setFavorite(id: string): Observable<Favorites> {
        this.setSerializer(new FavoritesSerializer());
        this.setResource('favorites.php');
        const body = new URLSearchParams();
        body.set('id', id);
        return this.create(body);
    }
}
