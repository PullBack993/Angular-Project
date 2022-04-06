import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, OnDestroy {
  ads: IAds[] = [];
  pages: number = 1;
  totalResults!: number;

  constructor(private adsServie: AdsService) {}

  ngOnInit(): void {
    this.getPagedAds(this.pages);
  }
  getPagedAds(page: number) {
    this.adsServie.getAds(page).subscribe((res) => {
      this.ads = res.data;
      this.pages = res.total_pages == 0 ? 1 : res.total_pages;
      this.totalResults = res.total_results;
      console.log(this.pages);
    });
  }
  paginate(event: any) {
    this.getPagedAds(event.page + 1);
  }
  ngOnDestroy(): void {}
}
