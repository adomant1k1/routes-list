import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

import {Toaster} from '../../../core/models/toaster';

@Injectable()
export class ToasterService {
    settings = {
        timeOut: 2000,
        progressAnimation: 'decreasing',
        progressBar: true,
        positionClass: 'toast-bottom-right',
    };

    constructor(private toastr: ToastrService) {}

    successToast(message: Toaster, timeOut?: number): void {
        setTimeout(() =>
            this.toastr.success(message.content, message.title, {
                timeOut: timeOut ? timeOut : this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    errorToast(message: Toaster, timeOut?: number): void {
        setTimeout(() =>
            this.toastr.error(message.content, message.title, {
                timeOut: timeOut ? timeOut : this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    warningToast(message: Toaster, timeOut?: number): void {
        setTimeout(() =>
            this.toastr.warning(message.content, message.title, {
                timeOut: timeOut || this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    infoToast(message: Toaster): void {
        setTimeout(() =>
            this.toastr.info(message.content, message.title, {
                timeOut: this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }
}
