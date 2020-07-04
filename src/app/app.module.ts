import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { MapComponent } from './_components/map/map.component';
import {AppRoutingModule} from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DetailsComponent } from './_components/details/details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiInterceptor} from './_interceptor/api.interceptor';
import { SearchbarComponent } from './_components/searchbar/searchbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailsMobileComponent } from './_components/details-mobile/details-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DetailsComponent,
    SearchbarComponent,
    DetailsMobileComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  entryComponents: [DetailsMobileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
