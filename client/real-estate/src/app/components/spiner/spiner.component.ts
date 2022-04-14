import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spiner',
  templateUrl: './spiner.component.html',
  styleUrls: ['./spiner.component.scss']
})
export class SpinerComponent implements OnInit {
  @Input() isLoading: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
