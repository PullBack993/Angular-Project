import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  subscription!: Subscription;
  path!: string;
  isLoading: boolean = true;

  constructor(private adsServie: AdsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.path = '';
    this.path = this.activatedRoute.snapshot.url[0].path;
    this.getPagedAds(this.pages, this.path);
  }

  getPagedAds(page: number, path: string) {
    this.subscription = this.adsServie.getAds(page, path).subscribe((res) => {
      this.ads = res.data;
      this.pages = res.total_pages == 0 ? 1 : res.total_pages;
      this.totalResults = res.total_results;
      this.isLoading = false
    });
  }
  paginate(event: any) {
    console.log(event.page);
    this.getPagedAds(event.page + 1, this.path);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
