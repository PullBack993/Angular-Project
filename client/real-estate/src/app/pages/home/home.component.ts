import { Component, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ads: IAds[] = [];
  projects: IAds[] = [];
  isLoading: boolean = true;

  constructor(private adsServie: AdsService) {}

  ngOnInit(): void {
    
    this.adsServie.getAdsProjectsData().subscribe((data) => {
      this.projects = data.latestProjects;
      this.ads = data.latestAds;
      this.isLoading = false;
    });
  }
}
