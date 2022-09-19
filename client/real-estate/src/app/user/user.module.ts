import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { UserRoutingModule } from './app-user-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileViewComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ComponentsModule,
    ProgressSpinnerModule,
    TabMenuModule
  ]
})
export class UserModule {}
