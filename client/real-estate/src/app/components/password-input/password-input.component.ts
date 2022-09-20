import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  showPassword: boolean = false;
  class: boolean = false;
  focusOut: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onFocus(event: Event) {
    const isValue = (event.target as HTMLInputElement).value;
    console.log(isValue)
    if (!this.class || !isValue) {
      this.class = true;
      console.log('true');
    }
  }
  onFocusOut(event: Event) {
    const isValue = (event.target as HTMLInputElement).value;
    if (!isValue ) {
      this.class = false;
      this.focusOut = true
      console.log(this.class)
    } 
  }
}
