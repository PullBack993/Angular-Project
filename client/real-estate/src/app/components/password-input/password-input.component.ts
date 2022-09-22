import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  showPassword: boolean = false;
  focus: boolean = false;
  focusOut: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onFocus(event: Event) {
    const isValue = (event.target as HTMLInputElement).value;
    this.focusOut = false;

    console.log(isValue);
    if (!this.focus || !isValue) {
      this.focus = true;
    }
  }
  onFocusOut(event: Event) {
    const isValue = (event.target as HTMLInputElement).value;
    if (!isValue) {
      this.focus = false;
      this.focusOut = true;
    }
  }
}
