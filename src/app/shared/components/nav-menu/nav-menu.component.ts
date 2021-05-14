import {Component, Input, OnInit} from '@angular/core';

import {HeaderItem} from '../../../core/models/utils';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
    @Input() menuItems: HeaderItem[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
