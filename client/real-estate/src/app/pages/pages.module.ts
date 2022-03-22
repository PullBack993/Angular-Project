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
import { SearchComponent } from '../components/search/search.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AdsComponent } from '../components/ads/ads.component';

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
    SearchComponent,
    ProjectsComponent,
    AdsComponent
  ],

  imports: [CommonModule, FontAwesomeModule, AppRoutingModule, CoreModule, HttpClientModule],

  exports: [],
  providers: []
})
export class PagesModule {}
