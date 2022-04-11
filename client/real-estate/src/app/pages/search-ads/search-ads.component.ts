import {  Component,  OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAds } from 'src/app/models/ads';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-search-ads',
  templateUrl: './search-ads.component.html',
  styleUrls: ['./search-ads.component.scss']
})
export class SearchAdsComponent implements OnInit, OnDestroy {
  ads!: IAds[];
  private subscription!: Subscription;

  constructor(private searchedData: AdsService) {}

  ngOnInit(): void {
    this.subscription = this.searchedData.currentSearchData$.subscribe((data) => {
      this.ads = data.data;
    });
    console.log(this.ads);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
