import { Component, Input, OnInit } from '@angular/core';
import { IAds } from '../../models/ads';

@Component({
  selector: 'app-ad-views',
  templateUrl: './ad-views.component.html',
  styleUrls: ['./ad-views.component.scss']
})
export class AdViewsComponent implements OnInit {
  @Input() adsData: IAds[] = [];
  constructor() {}

  ngOnInit(): void {
  console.log(this.adsData);

  }
}
