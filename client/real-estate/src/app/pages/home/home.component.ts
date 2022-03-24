import { Component, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ad: IAds[] = [];
  projects: IAds[] = [];

  constructor(private adsServie: AdsService) {}

  ngOnInit(): void {
    this.adsServie.getAdsProjectsData().subscribe((data) => {
      this.projects = data.latestProjects;
      this.ad = data.latestAds;
    });
  }
}
