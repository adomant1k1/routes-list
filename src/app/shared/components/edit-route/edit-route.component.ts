import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {SelectOption} from '../../../core/models/utils';
import {INTERFACE_OPTIONS, IPV4_REGEX, MASK_OPTIONS} from '../../utils/utilities-constants';
import {RouteDTO} from '../../../core/models/route';

@Component({
    selector: 'app-edit-route',
    templateUrl: './edit-route.component.html',
    styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit {
    @Input() route: RouteDTO;

    formGroup: FormGroup;

    maskOptions: SelectOption[] = MASK_OPTIONS.map(it => {
        return {
            label: it,
            value: it
        };
    });
    interfaceOptions: SelectOption[] = INTERFACE_OPTIONS.map(it => {
        return {
            label: it,
            value: it
        };
    });

    defaultValue: RouteDTO = {
        uuid: null,
        address: null,
        interface: null,
        gateway: null,
        mask: null
    };

    constructor() {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        let route: RouteDTO = this.defaultValue;
        if (this.route) {
            this.defaultValue = this.route;
            route = this.route;
        }

        this.formGroup = new FormGroup({
            address: new FormControl(route.address, [Validators.required, Validators.pattern(IPV4_REGEX)]),
            mask: new FormControl(route.mask, [Validators.required]),
            gateway: new FormControl(route.gateway, [Validators.required, Validators.pattern(IPV4_REGEX)]),
            interface: new FormControl(route.interface)
        });
    }

    onCancel(): void {
        this.formGroup.patchValue(this.defaultValue);
    }
}
