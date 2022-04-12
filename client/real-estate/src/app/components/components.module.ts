import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdsComponent } from './ads/ads.component';
import { AdViewsComponent } from './ad-views/ad-views.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditViewComponent } from './edit-view/edit-view.component';
import { AddComponent } from './add/add-ad.component';
import { AuthInterceptor } from '../user/auth.interceptor';
import { DetailsViewComponent } from './details-view/details-view.component';
import { PrimeNgModule } from './prime-ng.module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    SearchComponent,
    ProjectsComponent,
    AdsComponent,
    AdViewsComponent,
    AddComponent,
    EditViewComponent,
    DetailsViewComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule

   
  ],
  exports: [
    SearchComponent,
    ProjectsComponent,
    AdsComponent,
    AdViewsComponent,
    AddComponent,
    EditViewComponent,
    DetailsViewComponent,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class ComponentsModule {}
