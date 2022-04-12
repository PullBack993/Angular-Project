import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../user/auth.guard';
import { AddAdComponent } from './add-ad/add-ad.component';
import { AdvicesComponent } from './advices/advices.component';
import { BrokersFirmsComponent } from './brokers-firms/brokers-firms.component';
import { BrokersComponent } from './brokers/brokers.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { PropertyComponent } from './property/property.component';
import {EditComponent} from './edit/edit.component'
import { SearchAdsComponent } from './search-ads/search-ads.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'properties',
    component: PropertyComponent
  },
  {
    path: 'search',
    component: SearchAdsComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'new-projects',
    component: PropertyComponent
  },
  {
    path: 'retail-outlet',
    component: PropertyComponent
  },
  {
    path: 'add-ad',
    component: AddAdComponent,
    canActivate: [AuthGuard]
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
    component: CalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PagesRoutingModule {}
