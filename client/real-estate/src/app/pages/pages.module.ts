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
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from '../core/header/header.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

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
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    PaginatorModule,
    ComponentsModule,
    CoreModule,
    PasswordModule,
    DividerModule
  ],

  exports: [],
  providers: []
})
export class PagesModule {}
