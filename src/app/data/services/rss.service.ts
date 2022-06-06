import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CorsProxyService } from './cors-proxy.service';
import { RssSerializer } from '../serializers/rss.serializer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export abstract class RssService extends CorsProxyService {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.setSerializer(new RssSerializer());
    }

    public override catchError(error: HttpErrorResponse): any {
        const response = error.error.text;

        return of(response).pipe(
            map((data: object) => this.serializer?.fromJson(data))
        );
    }
}
