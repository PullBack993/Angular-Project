import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ICity, IConstructionType, IAdType, ITags, IAds, ILocation, IRegion, ICreateAd } from '../../models/ads';
import { estateTypes, cities, construction, tags, townOptions } from '../../components/helper';
import { AdsService } from '../../services/ads.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit,OnDestroy {
  adData!: IAds;
  private subscription!: Subscription;
 
  tags: ITags[];
  cities!: ICity[];
  townOptions!: IRegion;
  region!: ICity[];
  type: IAdType[];
  uploadedFiles!: File[];
  constructionType: IConstructionType[];
  shouldDisabled: boolean = true;
  isUpload: boolean = true;
  loading: boolean = false;
  checked: boolean = false;
  error: boolean = false;
  message: string = '';
  createdId: string = '';
  location!: ILocation;
  index!: number;
  inputTags: ITags[];
  constType!: [{ type: string }] | {};
  selectedValue: string = 'adType';
  isDisabled: boolean = true;

  addFormGroup: FormGroup = this.fb.group({
    adType: new FormControl([], [Validators.required]),
    image: new FormControl('null'),
    title: new FormControl('', [Validators.required]),
    estateType: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    location: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    area: new FormControl(null, [Validators.required]),
    floor: new FormControl(null, [Validators.required]),
    constructionType: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    telNumber: new FormControl(null, [Validators.required]),
    moreInfo: new FormControl('', [Validators.required])
  });

   constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private adService: AdsService,
    private activateRoute: ActivatedRoute
  ) {
    this.cities = cities();
    this.tags = tags;
    this.type = estateTypes;
    this.constructionType = construction;
    this.townOptions = townOptions;
    this.inputTags = [];
    this.constType = [{}];
  }
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      this.getAd(id);
    });
  }
  getAd(id: string) {
    this.subscription = this.adService.getById(id).subscribe((res) => {
      this.adData = res;
    });
  }


  setLocation(value: string) {
    this.shouldDisabled = false;
    let location: any = this.cities.find((l) => l.name == value);
    this.location = location;
    if (this.adData.region) {
      this.setRegion();
    }
    return location;
  }
  setRegion() {
    let regionArr = this.townOptions[this.location.searchValue as keyof typeof this.townOptions];
    let region = regionArr.findIndex((r) => r.name == this.adData.region);
    this.region = regionArr;
    this.index = region;
    this.adData.region = '';
    if (this.adData.tags != []) {
      this.setTags();
      this.setconstructionType();
      this.checked = this.adData.isNewProject;
    }
  }
  setconstructionType() {
    this.constType = [{ type: this.adData.constructionType }];
  }
  setTags() {
    this.adData.tags.forEach((inputTag) => {
      let tag = { tag: inputTag };
      this.inputTags.push(tag);
    });
    this.adData.tags = [];
  }

  setEstateType(value: string) {
    let type = this.type.find((t) => t.type == value);
    return type;
  }

  onCheck() {
    this.checked = !this.checked;
  }
  onClear() {
    this.uploadedFiles = [];
    this.isDisabled = !this.isDisabled;

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
    this.messageService.add({ severity: 'Информация', summary: 'Успешно качен фаил', detail: '' });
  }


  checkTouch(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  onCreate(event: Event) {
    this.loading = true;
    this.isUpload = false;
    const { adType, title, price, area, floor, telNumber, moreInfo, estateType, location, region } =
      this.addFormGroup.value;

    const formData: FormData = new FormData();
    if (this.uploadedFiles != undefined) {
      for (const file of this.addFormGroup.controls['image'].value) {
        formData.append('img', file);
      }
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
      formData.append('owner', this.adData.owner);
      formData.append('_id', this.adData._id);

      for (const url of this.adData.imageUrls) {
        formData.append('deleteUrl', url);
      }

      for (let i = 0; i < this.addFormGroup.value.tags.length; i++) {
        formData.append('tags', this.addFormGroup.value.tags[i].tag);
      }
    }

    const id = this.adData._id;
    if (this.uploadedFiles != undefined && this.uploadedFiles.length > 0) {
      this.adService.editAd(formData, id);
    } else {
      const tags = [];
      for (let i = 0; i < this.addFormGroup.value.tags.length; i++) {
        tags.push(this.addFormGroup.value.tags[i].tag);
      }

      const body: ICreateAd = {
        _id: this.adData._id,
        owner: this.adData.owner,
        title: title,
        adType: adType,
        estateType: estateType.type,
        price: price,
        location: location.name,
        imageUrls: this.adData.imageUrls,
        region: region.name,
        area: area,
        floor: floor,
        constructionType: this.addFormGroup.value.constructionType[0].type,
        tags: tags,
        telNumber: telNumber,
        moreInfo: moreInfo,
        isNewProject: this.checked
      };
      this.adService.editAd(body, id);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
