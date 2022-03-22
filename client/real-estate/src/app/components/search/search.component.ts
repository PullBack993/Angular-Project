import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [trigger('blink', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]

})
export class SearchComponent implements OnInit {
  

  constructor() {}

  ngOnInit(): void {}
}
