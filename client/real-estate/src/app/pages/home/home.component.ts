import { Component, OnInit } from '@angular/core';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ad: any = [];
  projects: any = [];

  constructor(private ads: AdsService) {}

  ngOnInit(): void {
    this.ads.getAdsProjectsData().subscribe((res: any) => {
      this.projects = res.latestProjects;
      this.ad = res.latestAds;
    });
    
  }
}
