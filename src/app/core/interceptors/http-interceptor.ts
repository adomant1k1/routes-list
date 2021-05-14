import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {ToasterService} from '../../shared/services/toaster/toaster.service';
import {RESPONSE_CODE} from '../../shared/utils/utilities-constants';


@Injectable()
export class ResponseCodeInterceptor implements HttpInterceptor {
    constructor(private toaster: ToasterService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) {
                        const content = event.body.message ? event.body.message : `${RESPONSE_CODE[event.body.code]}`;

                        if (event.body.code <= 7) {
                            this.toaster.errorToast({
                                title: 'Ошибка',
                                content
                            });
                        } else if ((event.body.code >= 7 && event.body.code < 200) && event.body.code !== 105) {
                            this.toaster.successToast({
                                title: 'Успех',
                                content
                            });
                        } else if (event.body.code >= 200) {
                            this.toaster.warningToast({
                                title: 'Предупреждение',
                                content
                            });
                        }
                    }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        this.toaster.errorToast({
                            title: 'Ошибка',
                            content: 'Неизвестная ошибка, обратитесь к администратору'
                        });
                    }
                }
            )
        );
    }
}
