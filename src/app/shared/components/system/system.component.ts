import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { System } from 'src/app/data/models/system.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RaspberryService } from 'src/app/data/services/raspberry.service';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {
    public ngUnsubscribe = new Subject<void>();
    public system: System | undefined;

    constructor(private raspberryService: RaspberryService) {}

    public getSystem(): void {
        this.raspberryService
            .getSystem()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((response) => {
                this.system = response;
            });

        window.setTimeout(() => {
            this.getSystem();
        }, 1000 * 30); // 30 seconds
    }

    public ngOnInit(): void {
        this.getSystem();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
