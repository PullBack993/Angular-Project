import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IAdType, ICity } from 'src/app/models/ads';
import { estateTypes, cities } from '../helper';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  cities!: ICity[];
  type: IAdType[];
  adType: { adType: string }[] = [{ adType: 'Miete' }, { adType: 'Kauf' }];

  form: FormGroup = this.fb.group({
    location: new FormControl(),
    adType: new FormControl('Miete'),
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
    // == 'Miete' ? 'sell' : 'rent';
    let currentValue = this.form?.controls['adType'].value;
    let estateType = '';
    if (currentValue.adType == 'Miete' || currentValue == 'Miete') {
      this.form.value.adType = 'Miete';
      estateType = 'rent';
    }
    if (currentValue.adType == 'Kauf' || currentValue == 'Kauf') {
      this.form.value.adType = 'Kauf';
      estateType = 'sell';
    } 

    console.log(this.form?.value?.adType);
    console.log(estateType);
    const body = {
      location: this.form.value?.location?.name,
      adType: estateType,
      estateType: this.form.value?.estateType?.type,
      area: this.form.value?.area,
      price: this.form.value?.price,
      limit: 1
    };

    this.searchService.search(body);
  }
}
