import { Component,  OnInit } from '@angular/core';
import {  IAdType, ICity } from 'src/app/models/ads';
import { estateTypes, cities } from '../helper';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
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

  constructor(private fb: FormBuilder, private searchService: AdsService) {
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

    this.searchService.search(body)

  }
}
