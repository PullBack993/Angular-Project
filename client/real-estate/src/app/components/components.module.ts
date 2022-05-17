import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdViewsComponent } from './ad-views/ad-views.component';
import { SearchComponent } from './search/search.component';

import { AuthInterceptor } from '../user/auth.interceptor';
import { DetailsViewComponent } from './details-view/details-view.component';
import { PrimeNgModule } from '../pages/prime-ng.module';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationService } from 'primeng/api';
import { SpinerComponent } from './spiner/spiner.component';

import { AsidenavComponent } from './asidenav/asidenav.component'; 
import { MatSidenavModule } from '@angular/material/sidenav';



import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [SearchComponent, AdViewsComponent, DetailsViewComponent, SpinerComponent, AsidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    MatSidenavModule,
    MatIconModule,
    SharedModule,
    MatToolbarModule
  ],
  exports: [SearchComponent, AdViewsComponent, DetailsViewComponent, SpinerComponent, AsidenavComponent],
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
export class ComponentsModule {}
