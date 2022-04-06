import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAd2, IAds } from '../../models/ads';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  ad!: IAds

  constructor(private route: ActivatedRoute, private adService: AdsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getAd(id);
    });
  }
  getAd(id: string) {
    this.adService.getById(id).subscribe((res) => {
      this.ad = res
      // this.ad.name.location = res.location;
      // a.name.location = location;
      // a.adType = data.adType;
      // a.area = data.area;
      // a.constructionType = data.constructionType;
      // a.estateType = data.estateType;
      // a.floor = data.floor;
      // a.imageUrls = data.imageUrls;
      // a.isNewProject = data.isNewProject;
      // a.price = data.price;
      // a.region = data.region;
      // a.title = data.title;
      // a.telNumber = data.telNumber;
      // this.ad = a;
    });
  }
}
