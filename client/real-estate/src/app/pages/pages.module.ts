import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyComponent } from './property/property.component';
import { NewProjectsComponent } from './new-projects/new-projects.component';
import { RetailOutletComponent } from './retail-outlet/retail-outlet.component';
import { HomeComponent } from './home/home.component';
import { AddAdComponent } from './add-ad/add-ad.component';
import { BrokersComponent } from './brokers/brokers.component';
import { BrokersFirmsComponent } from './brokers-firms/brokers-firms.component';
import { AdvicesComponent } from './advices/advices.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { ComponentsModule } from '../components/components.module';
import { DividerModule } from 'primeng/divider';
import { PagesRoutingModule } from './app-pages-routing.module';


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
    HomeComponent
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    PaginatorModule,
    ComponentsModule,
    CoreModule,

  ],

  exports: [],
  providers: []
})
export class PagesModule {}
