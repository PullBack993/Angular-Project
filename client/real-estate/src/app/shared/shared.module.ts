import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './shorten.pipe';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ButtonModule } from 'primeng/button';
import { ToDecimalPipePipe } from './to-decimal-pipe.pipe';


@NgModule({
  declarations: [ShortenPipe, ErrorPageComponent, ToDecimalPipePipe],
  imports: [CommonModule, ButtonModule],
  exports: [ShortenPipe, ToDecimalPipePipe]
})
export class SharedModule {}
