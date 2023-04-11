import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FullComponent } from './modules/shared/full/full.component';
import { NavigationComponent } from './modules/shared/components/header/navigation.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
//import { AgGridModule } from "@ag-grid-community/angular";
import { ToastrModule } from 'ngx-toastr';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorCatchingInterceptor } from './modules/shared/services/error-catching.interceptor';
import { LoaderComponent } from './modules/shared/components/loader/loader.component';
import { LoaderInterceptor } from './modules/shared/services/loading.inceptor';
import { ProfileComponent } from './modules/shared/components/profile/profile.component';
import { APIInterceptor } from './modules/shared/services/api.interceptor';
import { TypeLayoutComponent } from './modules/typing/type-layout/type-layout.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    LoaderComponent,
    ProfileComponent,
    TypeLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    PerfectScrollbarModule,
    NgbDropdownModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    // AgGridModule.withComponents([]),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


