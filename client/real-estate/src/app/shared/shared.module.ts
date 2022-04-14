import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './shorten.pipe';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [ShortenPipe, ErrorPageComponent],
  imports: [CommonModule, ButtonModule],
  exports: [ShortenPipe]
})
export class SharedModule {}
