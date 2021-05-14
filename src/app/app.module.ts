import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {NavMenuComponent} from './shared/components/nav-menu/nav-menu.component';
import {RouteListComponent} from './pages/route-list/route-list.component';
import {UpdateRouteComponent} from './pages/update-route-modal/update-route.component';
import {AppRoutingModule} from './app-routing.module';
import { AddRouteComponent } from './pages/add-route/add-route.component';
import {ResponseCodeInterceptor} from './core/interceptors/http-interceptor';
import {ToasterService} from './shared/services/toaster/toaster.service';
import { EditRouteComponent } from './shared/components/edit-route/edit-route.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        RouteListComponent,
        UpdateRouteComponent,
        AddRouteComponent,
        EditRouteComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        AppRoutingModule
    ],
    providers: [
        ToasterService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseCodeInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
