import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IAds, IAdType, ICity } from 'src/app/models/ads';
import { estateTypes, cities } from '../helper';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [trigger('blink', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SearchComponent implements OnInit {
  cities!: ICity[];
  type: IAdType[];
  adType: { adType: string }[] = [{ adType: 'НАЕМИ' }, { adType: 'КУПИ' }];

  form: FormGroup = this.fb.group({
    location: new FormControl(),
    adType: new FormControl('НАЕМИ'),
    estateType: new FormControl(),
    price: new FormControl(),
    area: new FormControl()
  });

  constructor(private fb: FormBuilder, private searchService: AdsService, private router: Router) {
    this.cities = cities();
    this.type = estateTypes;
  }

  ngOnInit(): void {}

  onSearch() {
    const estateType = this.form?.value?.adType == 'НАЕМИ' ? 'rent' : 'sell';
    const body = {
      location: this.form.value?.location?.name,
      adType: estateType,
      estateType: this.form.value?.estateType?.type,
      area: this.form.value?.area,
      price: this.form.value?.price,
      limit: 1
    };
    console.log(body);
    this.searchService.search(body)

  }
}
