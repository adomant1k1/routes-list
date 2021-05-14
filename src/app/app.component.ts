import {Component} from '@angular/core';

import {HeaderItem} from './core/models/utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'NMDTESTTASK';

    topMenuItems: HeaderItem[] = [
        { label: 'Список маршрутов', routerLink: 'routes' },
        { label: 'Добавить маршрут', routerLink: 'add-route' }
    ];
}
