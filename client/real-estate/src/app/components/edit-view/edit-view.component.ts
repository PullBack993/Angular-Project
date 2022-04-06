import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICity, IConstructionType, IAdType, ITags, IAds, IAd2, IRegion } from '../../models/ads';
import { adTypes, cities, construction, tags, townOptions } from '../helper';
import { AdsService } from '../../services/ads.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent {
  @Input() adData!: IAds;

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
  location!: IAd2;
  index!: number;
  b: ITags[];
  constType!: [{ type: string }] | {};
  selectedValue: string = 'adType';
    

  addFormGroup: FormGroup = this.fb.group({
    adType: new FormControl([], [Validators.required]),
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
    private createService: AdsService,
    private route: Router
  ) {
    this.cities = cities();
    this.tags = tags;
    this.type = adTypes;
    this.constructionType = construction;
    this.townOptions = townOptions;
    this.b = [];
    this.constType = [{}];
  }

  onEdit(value: string) {
    this.shouldDisabled = false;
    let location: any = this.cities.find((l) => l.name == value);
    this.location = location;
    if (this.adData.region) {
      this.findRegion();
    }
    return location;
  }
  findRegion() {
    let regionArr = this.townOptions[this.location.searchValue as keyof typeof this.townOptions];
    let region = regionArr.findIndex((r) => r.name == this.adData.region);
    this.region = regionArr;
    this.index = region;
    this.adData.region = '';
    if (this.adData.tags != []) {
      this.findTags();
      this.setconstructionType();
      console.log(this.checked);

      this.checked = this.adData.isNewProject;
      console.log(this.checked)

    }
  }
  setconstructionType() {
    this.constType = [{ type: this.adData.constructionType }];
  }
  findTags() {
    this.adData.tags.forEach((e) => {
      let a = { tag: e };
      this.b.push(a);
    });
    this.adData.tags = [];
  }

  findEstateType(value: string) {
    let type = this.type.find((t) => t.type == value);
    return type;
  }

  onCheck() {
    this.checked = !this.checked;
  }
  onClear() {
    this.uploadedFiles = [];
  }
  changeFromChild(event: any): void {
    const currentValue: string = event.value.searchValue;
    let region = townOptions[currentValue as keyof typeof townOptions];
    this.region = region;
    this.shouldDisabled = false;
  }
  onUpload(event: any) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.addFormGroup.patchValue({ image: this.uploadedFiles });
    this.addFormGroup.get('image')?.updateValueAndValidity();
    this.messageService.add({ severity: 'Информация', summary: 'Успешно качен фаил', detail: '' });
  }

  ngOnInit(): void {}

  checkTouch(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  onCreate(event: Event) {
    this.loading = true;
    this.isUpload = false;
    const formData: FormData = new FormData();
    if (this.uploadedFiles.length > 0) {
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
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('sucess');
        this.route.navigate(['']);
      },
      error: (err) => {
        console.log(err.error.message);
      }
    });
  }
}
