import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdComponent } from './add-ad/add-ad.component';
import { AdvicesComponent } from './advices/advices.component';
import { BrokersFirmsComponent } from './brokers-firms/brokers-firms.component';
import { BrokersComponent } from './brokers/brokers.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HomeComponent } from './home/home.component';
import { NewProjectsComponent } from './new-projects/new-projects.component';
import { PropertyComponent } from './property/property.component';
import { RetailOutletComponent } from './retail-outlet/retail-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'property',
    component: PropertyComponent
  },
  {
    path: 'new-projects',
    component: NewProjectsComponent
  },
  {
    path: 'retail-outlet',
    component: RetailOutletComponent
  },
  {
    path: 'add-ad',
    component: AddAdComponent
  },
  {
    path: 'brokers',
    component: BrokersComponent
  },
  {
    path: 'brokers-firms',
    component: BrokersFirmsComponent
  },
  {
    path: 'advices',
    component: AdvicesComponent
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
