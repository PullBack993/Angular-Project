import { Component, HostListener, OnInit } from '@angular/core';
import { faEnvelope, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// @HostListener('mouseenter') onMouseLeave(event){
//   this.highlight('yellow')
// }
export class HeaderComponent implements OnInit {
  icons = {
    faEnvelope,
    faCaretDown,
    faCaretUp
  };
  showButtons: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
