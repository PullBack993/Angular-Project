import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PropertyComponent } from './property/property.component';
import { HomeComponent } from './home/home.component';
import { AddAdComponent } from './add-ad/add-ad.component';

import { CalculatorComponent } from './calculator/calculator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '../core/core.module';
import { PaginatorModule } from 'primeng/paginator';
import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './app-pages-routing.module';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { SearchAdsComponent } from './search-ads/search-ads.component';
import { PrimeNgModule } from './prime-ng.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthInterceptor } from '../user/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    PropertyComponent,
    AddAdComponent,
    CalculatorComponent,
    HomeComponent,
    EditComponent,
    DetailsComponent,
    SearchAdsComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    PaginatorModule,
    ComponentsModule,
    CoreModule,
    PrimeNgModule,
    SharedModule
  ],

  exports: [],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class PagesModule {}
