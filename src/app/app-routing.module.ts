import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RouteListComponent} from './pages/route-list/route-list.component';
import {AddRouteComponent} from './pages/add-route/add-route.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'routes',
        pathMatch: 'full'
    },
    {
        path: 'routes',
        component: RouteListComponent
    },
    {
        path: 'add-route',
        component: AddRouteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
