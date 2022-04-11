import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NewProjectsComponent } from './new-projects/new-projects.component';

import { PropertyComponent } from './property/property.component';
import { RetailOutletComponent } from './retail-outlet/retail-outlet.component';
import { HomeComponent } from './home/home.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { BrokersComponent } from './brokers/brokers.component';
import { BrokersFirmsComponent } from './brokers-firms/brokers-firms.component';
import { AdvicesComponent } from './advices/advices.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '../core/core.module';
import { PaginatorModule } from 'primeng/paginator';
import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './app-pages-routing.module';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { SearchAdsComponent } from './search-ads/search-ads.component';

@NgModule({
  declarations: [
    PropertyComponent,
    NewProjectsComponent,
    RetailOutletComponent,
    AddAdComponent,
    BrokersComponent,
    BrokersFirmsComponent,
    AdvicesComponent,
    CalculatorComponent,
    HomeComponent,
    EditComponent,
    DetailsComponent,
    SearchAdsComponent,
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    PaginatorModule,
    ComponentsModule,
    CoreModule
  ],

  exports: [],
  providers: []
})
export class PagesModule {}
