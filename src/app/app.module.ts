import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InputTextareaModule } from 'primeng/inputtextarea';

import { AccordionModule } from 'primeng/accordion';
import { TreeTableModule } from 'primeng/treetable';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AnnouncementComponent } from './announcements/announcements.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TableModule } from 'primeng/table';
import { CesiumDirective } from './cesium.directive';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CesiumDirective,
    AnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TableModule,
    FlexLayoutModule,
    AccordionModule,
    DynamicDialogModule,
    TreeTableModule,
    InputTextareaModule,
    PanelModule,
    ChartModule,
    ButtonModule
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
