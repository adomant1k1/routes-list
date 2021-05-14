import {Component, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {EditRouteComponent} from '../../shared/components/edit-route/edit-route.component';
import {RoutesService} from '../../shared/services/routes/routes.service';

@Component({
    selector: 'app-add-route',
    templateUrl: './add-route.component.html',
    styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {
    @ViewChild('editRouteComponent') editComponent: EditRouteComponent;

    get formGroup(): FormGroup {
        return this.editComponent?.formGroup;
    }

    get isAddDisabled(): boolean {
        return this.formGroup ? (this.formGroup.pristine || this.formGroup.invalid) : true;
    }

    constructor(private apiService: RoutesService) {}

    validateAndSendForm(): void {
        for (const [key, value] of Object.entries(this.formGroup.controls)) {
            value.markAsTouched();
        }

        if (this.formGroup.valid) {
            this.sendForm();
        }
    }

    sendForm(): void {
        const formValue = this.formGroup.value;
        this.apiService.createRoute(formValue).subscribe((response) => {});
        this.formGroup.reset(this.editComponent.defaultValue);
    }
}
