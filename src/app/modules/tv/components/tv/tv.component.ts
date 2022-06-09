import { Subject } from 'rxjs';
import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements AfterViewInit {
    public fetchDataSubject = new Subject<void>();
    public showDataSubject = new Subject<void>();

    public ngAfterViewInit(): void {
        this.castfetchDataSubject();
        this.castShowDataSubject();
    }

    public castfetchDataSubject(): void {
        this.fetchDataSubject.next();

        setTimeout(() => {
            this.castfetchDataSubject();
        }, 1000 * 60 * 60); // 60 minutes
    }

    public castShowDataSubject(): void {
        this.showDataSubject.next();

        setTimeout(() => {
            this.castShowDataSubject();
        }, 1000 * 60 * 1); // 1 minute
    }
}
