import { Component, Input, OnInit } from '@angular/core';
import { Ads } from '../../models/ads';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  @Input() ads: Ads[] = [];

  constructor() {}

  ngOnInit(): void {
  }
}
