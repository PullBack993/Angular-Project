import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdsService } from 'src/app/services/ads.service';
import { cities2, townOptions } from './helper';

interface City {
  name: string;
}
interface City2 {
  type: string;
}
interface adTypes {
  name: string;
}
interface Rooms {
  room: string;
}
interface Town {
  OBLG: [{ name: string }];
}
interface t {
  key: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddComponent implements OnInit {
  cities!: City[];
  region: City[] = [];
  townOfCity!: Town;
  shouldDisabled: boolean = true;

  uploadedFiles: any[] = [];
  rooms: Rooms[];
  type: City2[] = [];
  file: [] = [];

  addFormGroup: FormGroup = this.fb.group({
    adType: new FormControl('', [Validators.required]),
    img: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    estateType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    floor: new FormControl('', [Validators.required]),
    constructionType: new FormControl('', [Validators.required]),
    tags: new FormControl('', [Validators.required]),
    telNumber: new FormControl('', [Validators.required]),
    moreInfo: new FormControl('', [Validators.required]),
    isNewProject: new FormControl()
  });

  constructor(private fb: FormBuilder, private messageService: MessageService, private createService: AdsService) {
    this.cities = cities2();
    this.rooms = [{ room: '1' }, { room: '2' }, { room: '3' }, { room: '4' }];

    //TODO CHANGE IT
    this.type = [{ type: 'edno' }, { type: 'dve' }];
  }

  onFinished(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    //TODO change it if clear() ....
    this.addFormGroup.patchValue({ img: this.uploadedFiles });
    this.addFormGroup.get('img')?.updateValueAndValidity();
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  onClear(event: any) {
    this.uploadedFiles = [];
  }
  changeFromChild(event: any): void {
    const currentValue: string = event.value.searchValue;
    let region = townOptions[currentValue as keyof typeof townOptions];
    this.region = region;
    this.shouldDisabled = false;
  }
  ngOnInit(): void {}
  onCreate(event: Event) {
    const formData: FormData = new FormData();
    formData.append('img', this.addFormGroup.value.img);
    formData.append('adType', this.addFormGroup.value.adType);
    formData.append('title', this.addFormGroup.value.title);
    formData.append('price', this.addFormGroup.value.price);
    formData.append('area', this.addFormGroup.value.area);
    formData.append('floor', this.addFormGroup.value.floor);
    formData.append('telNumber', this.addFormGroup.value.telNumber);
    formData.append('moreInfo', this.addFormGroup.value.moreInfo);

    formData.append('estateType', this.addFormGroup.value.estateType.type);
    formData.append('location', this.addFormGroup.value.location.name);
    formData.append('region', this.addFormGroup.value.region.name);
    formData.append('tags', 'new');
    formData.append('isNewProject', 'true');
    formData.append('constructionType', 'panel');
    formData.append('rooms', '1');
      console.log(JSON.stringify(formData));

      formData.forEach((value, key) => {
        console.log(key + ' ' + value);
      });

    //  /** In Angular 5, including the header Content-Type can invalidate your request */
  
    //  headers.append('Accept', 'application/json');
    //  this.http.post(`${this.apiEndPoint}`, formData, options);
    // const { adType, title, price, area, floor, telNumber, moreInfo } = this.addFormGroup.value;
    // const estateType = this.addFormGroup.value.estateType.type;
    // const location = this.addFormGroup.value.location.name;
    // const region = this.addFormGroup.value.region.name;
    // const img = this.addFormGroup.get('img')?.value;
    // const tags = 'new';
    // const isNewProject = true;
    // const constructionType = 'panel';
    // const rooms = 1;

    // const body = {
    //   rooms,
    //   adType,
    //   estateType,
    //   title,
    //   price,
    //   area,
    //   floor,
    //   telNumber,
    //   moreInfo,
    //   location,
    //   region,
    //   img,
    //   tags,
    //   isNewProject,
    //   constructionType
    // };
    // console.log(body);

    this.createService.createAd(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      complete: () => {
        console.log('sucess');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
