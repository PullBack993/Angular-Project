import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICity, IConstructionType, IAdType, ITags } from '../../models/ads';
import { estateTypes, cities, construction, tags, townOptions } from '../../components/helper';
import { AdsService } from '../../services/ads.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAdComponent implements OnInit {
  tags: ITags[];
  cities!: ICity[];
  region!: ICity[];
  type: IAdType[];
  uploadedFiles!: File[];
  constructionType: IConstructionType[];
  shouldDisabled: boolean = true;
  checked: boolean = false;
  isUpload: boolean = true;
  error: boolean = false;
  message: string = '';
  createdId: string = '';
  loading: boolean = false;
  isDisabled: boolean = true;
  subscription!: Subscription;

  addFormGroup: FormGroup = this.fb.group({
    adType: new FormControl([], [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.maxLength(58)]),
    estateType: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    location: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    area: new FormControl(null, [Validators.required]),
    floor: new FormControl(null),
    constructionType: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    telNumber: new FormControl(null, [Validators.required]),
    moreInfo: new FormControl('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private createService: AdsService,
    private router: Router
  ) {
    this.cities = cities();
    this.tags = tags;
    this.type = estateTypes;
    this.constructionType = construction;
  }

  onCheck() {
    this.checked = !this.checked;
  }
  onClear() {
    this.isDisabled = !this.isDisabled;

    this.uploadedFiles = [];
  }
  changeFromChild(event: any): void {
    const currentValue: string = event.value.searchValue;
    let region = townOptions[currentValue as keyof typeof townOptions];
    this.region = region;
    this.shouldDisabled = false;
  }
  onUpload(event: any) {
    this.isDisabled = !this.isDisabled;
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.addFormGroup.patchValue({ image: this.uploadedFiles });
    this.addFormGroup.get('image')?.updateValueAndValidity();
    this.messageService.add({ severity: 'Information', summary: 'Datei erfolgreich hochgeladen', detail: '' });
  }

  ngOnInit(): void {}

  checkTouch(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  onCreate(event: Event) {
    this.loading = true;
    this.isUpload = false;
    const formData: FormData = new FormData();
    if (this.uploadedFiles.length != undefined) {
      for (const file of this.addFormGroup.controls['image'].value) {
        formData.append('img', file);
      }
    }
    const { adType, title, price, area, floor, telNumber, moreInfo, estateType, location, region } =
      this.addFormGroup.value;

    formData.append('adType', adType);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('area', area);
    formData.append('floor', floor);
    formData.append('telNumber', telNumber);
    formData.append('moreInfo', moreInfo);
    formData.append('isNewProject', JSON.stringify(this.checked));
    formData.append('constructionType', this.addFormGroup.value.constructionType[0].type);
    formData.append('estateType', estateType.type);
    formData.append('location', location.name);
    formData.append('region', region.name);

    for (let i = 0; i < this.addFormGroup.value.tags.length; i++) {
      formData.append('tags', this.addFormGroup.value.tags[i].tag);
    }

    this.createService.createAd(formData).subscribe({
      complete: () => {
        this.router.navigate(['/properties']);
      }
    });
  }
}
