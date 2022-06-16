import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AdsService } from 'src/app/services/ads.service';
import { IAds } from '../../models/ads';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {
  images!: string[];
  @Input() adData!: IAds;
  @Input() isOwner!: boolean;
  subscription!: Subscription;
  id!: string;

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
      this._activeIndex = newValue;
    }
  }

  _activeIndex: number = 0;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private adsService: AdsService
  ) {}

  ngOnInit() {}

  onEdit() {
    this.subscription = this.activatedRoute.params.subscribe(({ id }) => {
      this.route.navigate([`edit/${id}`]);
    });
  }
  getImage() {
    if (this.adData.imageUrls) {
      this.images = this.adData.imageUrls;
      return this.images[this._activeIndex];
    }
    return;
  }
  next() {
    this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as HTMLInputElement,
      message: 'Möchten Sie den Beitrag wirklich löschen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.activatedRoute.params.subscribe(({ id }) => {
          this.adsService.deleteById(id);
        });
      },
      reject: () => {
        //reject action
      }
    });
  }

}
