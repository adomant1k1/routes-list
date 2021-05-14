import {Component, ComponentRef, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

import {RouteDTO} from '../../core/models/route';
import {RoutesService} from '../../shared/services/routes/routes.service';
import {EditRouteComponent} from '../../shared/components/edit-route/edit-route.component';

@Component({
    selector: 'app-update-route',
    templateUrl: './update-route.component.html',
    styleUrls: ['./update-route.component.scss']
})
export class UpdateRouteComponent {
    @ViewChild('editRouteComponent') editComponent: EditRouteComponent;

    route: RouteDTO;

    get formGroup(): FormGroup {
        return this.editComponent?.formGroup;
    }

    get isSaveDisabled(): boolean {
        return this.formGroup ? (this.formGroup.pristine || this.formGroup.invalid) : true;
    }

    constructor(private modal: NgbActiveModal, private apiService: RoutesService) {}


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
        this.apiService.updateRoute(formValue, this.route.uuid).subscribe((response) => {
            const result = response.code !== 101 ? 'Unsuccessfully' : 'Successfully';
            this.modal.close(`${result} updated`);
        });
    }

    delete(): void {
        this.apiService.deleteRoute(this.route.uuid).subscribe((response) => {
            const result = response.code !== 102 ? 'Unsuccessfully' : 'Successfully';
            this.modal.close(`${result} deleted`);
        });
    }

    onCrossClick(): void {
        this.modal.dismiss('Cross click');
    }

    onCancelClick(): void {
        this.editComponent.onCancel();
    }
}
