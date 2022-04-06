import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from 'src/app/services/ads.service';
import { IAds } from '../../models/ads';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ad!: IAds;
  constructor(private adsService: AdsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getAd(id);
    });
  }
  private getAd(id: string): void {
    this.adsService.getById(id).subscribe((ad) => {
      this.ad = ad
    });
  }
}
