import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {RoutesService} from '../../shared/services/routes/routes.service';
import {UpdateRouteComponent} from '../update-route-modal/update-route.component';
import {GridColumn, SortedBy} from '../../core/models/utils';
import {RouteDTO} from '../../core/models/route';
import {sortFn} from '../../shared/utils/utilities';

@Component({
    selector: 'app-route-list',
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent {
    gridColumns: GridColumn[] = [
        { title: 'Адрес назначения', sortingField: 'address', field: 'address', width: '33%', isIpField: true },
        { title: 'Шлюз', sortingField: 'gateway', field: 'gateway', width: '33%', isIpField: true },
        { title: 'Интерфейс', sortingField: 'interface', field: 'interface', width: '34%' },
    ];
    sortedBy: SortedBy = {
        fieldName: 'address',
        isAsc: true
    };

    reload$ = new BehaviorSubject(null);
    data$ = this.reload$.pipe(
        switchMap(() => this.apiService.getAllRoutes()),
        tap((response) => {
            this.data = this.sortData(response.payload.routes);
        })
    );

    data: RouteDTO[];

    constructor(private apiService: RoutesService, private modalService: NgbModal) {}

    handleRowClick(item: RouteDTO): void {
        const modalRef = this.modalService.open(UpdateRouteComponent, {
            centered: true,
            backdrop: 'static'
        });
        modalRef.componentInstance.route = item;
        modalRef.result.then((result: string) => {
            if (result.includes('Successfully')) {
                this.reload$.next(true);
            }
        }, (reason) => {});
    }

    sortData(items: RouteDTO[]): RouteDTO[] {
        const fieldColumn = this.gridColumns.find(x => (x.field === this.sortedBy.fieldName) && x.isIpField);
        const isIp = !!fieldColumn;

        return sortFn(items, this.sortedBy.fieldName, this.sortedBy.isAsc, isIp);
    }

    changeSort(fieldName: string): void {
        if (!fieldName) {
            return;
        }

        if (fieldName === this.sortedBy.fieldName) {
            this.sortedBy.isAsc = !this.sortedBy.isAsc;
        } else {
            this.sortedBy.fieldName = fieldName;
        }
        this.data = this.sortData(this.data);
    }

    trackByItem = (index: number, item: RouteDTO) => {
        return item;
    }
}
