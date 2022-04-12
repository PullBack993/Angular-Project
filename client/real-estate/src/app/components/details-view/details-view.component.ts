import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
      this._activeIndex = newValue;
    }
  }

  _activeIndex: number = 0;

  constructor(private route: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit() { }

  onEdit() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.route.navigate([`/edit/${id}`])
    })
    
  }
  getImage() {
    if (this.adData.imageUrls) {
      this.images = this.adData.imageUrls;
      return this.images[this._activeIndex];
    }
    return
  }
  next() {
    this.activeIndex++;
  }

  prev() {
    this.activeIndex--;
  }
}
