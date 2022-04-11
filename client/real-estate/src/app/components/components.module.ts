import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdsComponent } from './ads/ads.component';
import { AdViewsComponent } from './ad-views/ad-views.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AddComponent } from './add/add-ad.component';

import { StepsModule } from 'primeng/steps';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../user/auth.interceptor';
import { EditViewComponent } from './edit-view/edit-view.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { GalleriaModule } from 'primeng/galleria';

import { DetailsViewComponent } from './details-view/details-view.component';

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
    InputTextModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    FileUploadModule,
    StepsModule,
    InputNumberModule,
    MultiSelectModule,
    InputSwitchModule,
    GalleriaModule,
    ProgressSpinnerModule
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
