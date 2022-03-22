import { Component, OnInit } from '@angular/core';
import { faEnvelope, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  icons = {
    faEnvelope,
    faCaretDown,
    faCaretUp
  };

  constructor() {}

  ngOnInit(): void {}
}
