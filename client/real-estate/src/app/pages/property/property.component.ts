import { Component, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  ads: IAds[] = [];
  pages: number = 1;

  constructor(private adsServie: AdsService) {}

  ngOnInit(): void {
    this.getPagedAds(this.pages);
  }
  getPagedAds(page: number) {
    this.adsServie.getAds(page).subscribe((dataAds) => {
      this.ads = dataAds.data;
      this.pages = dataAds.total_pages == 0 ? 1 : dataAds.total_pages;
      console.log(this.pages);
    });
  }
  paginate(event: any) {
    this.getPagedAds(event.page + 1);
  }
}
