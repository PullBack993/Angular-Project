import { Component, Input, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';
@Component({
  selector: 'app-ad-views',
  templateUrl: './ad-views.component.html',
  styleUrls: ['./ad-views.component.scss']
})
export class AdViewsComponent implements OnInit {
  defaultImg: string = '../../../../../assets/images/index.png';
  @Input() adsData: IAds[] = [];
  @Input() pages: number = 1
  @Input() totalAds!: number
  constructor() {}

  ngOnInit(): void {}
}
