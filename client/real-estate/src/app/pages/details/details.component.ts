import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdsService } from 'src/app/services/ads.service';
import { UserService } from 'src/app/services/user.service';
import { IAds } from '../../models/ads';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
  ad!: IAds;
  userId!: string | null;
  isOwner: boolean = false;
  subscribsion!: Subscription;
  constructor(private adsService: AdsService,private userService:UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
         this.userId = this.userService.getUserId();
    this.subscribsion = this.route.params.subscribe(({ id }) => {
      this.getAd(id);
    });
  }
  private getAd(id: string): void {
   this.subscribsion = this.adsService.getById(id).subscribe((ad) => {
     this.ad = ad
     this.userId = this.userService.getUserId()
     if (ad.owner == this.userId) {
      this.isOwner = true
    }
     
    });
  }
  ngOnDestroy(): void {
    this.subscribsion.unsubscribe()
  }
}
