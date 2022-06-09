import {
    style,
    state,
    trigger,
    animate,
    transition,
} from '@angular/animations';

export const dataChange = trigger('dataChange', [
    state('void', style({ opacity: 0 })),
    state('*', style({ opacity: 1 })),
    transition('void => *', [animate('0.2s 0.2s ease-in-out')]),
    transition('* => void', [animate('0.2s ease-in-out')]),
]);

export const wallpaperChange = trigger('wallpaperChange', [
    state('void', style({ opacity: 0.8 })),
    state('*', style({ opacity: 1 })),
    transition('void => *', [animate('0.2s 0.2s ease-in-out')]),
    transition('* => void', [animate('0.2s ease-in-out')]),
]);
