import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { ProjectsComponent } from './projects/projects.component';
import { AdsComponent } from './ads/ads.component';
import { AdViewsComponent } from './ad-views/ad-views.component';



@NgModule({
  declarations: [SearchComponent, ProjectsComponent, AdsComponent, AdViewsComponent],
  imports: [CommonModule],
  exports: [SearchComponent, ProjectsComponent, AdsComponent, AdViewsComponent]
})
export class ComponentsModule {}
