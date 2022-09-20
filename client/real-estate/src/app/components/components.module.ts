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
import { PasswordInputComponent } from './password-input/password-input.component';

@NgModule({
  declarations: [SearchComponent, AdViewsComponent, DetailsViewComponent, SpinerComponent, PasswordInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeNgModule, SharedModule],
  exports: [SearchComponent, AdViewsComponent, DetailsViewComponent, SpinerComponent , PasswordInputComponent],
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
