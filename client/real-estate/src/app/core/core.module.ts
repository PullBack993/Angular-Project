import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FooterComponent, HeaderComponent]
})
export class CoreModule {}
