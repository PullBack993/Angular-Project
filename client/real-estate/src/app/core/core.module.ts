import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { ComponentsModule } from '../components/components.module';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MessagesModule,
    MessageModule,
    ComponentsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [FooterComponent, HeaderComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    }
  ],

})
export class CoreModule {}
