import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordChecker } from '../util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  loading: boolean = false;

  showPassword: boolean = false;
  focus: boolean = false;
  focusOut: boolean = false;

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  resetFormGroup: FormGroup = this.fb.group({
    password: this.passwordControl,
    rePass: new FormControl('', [passwordChecker(this.passwordControl)])
  });

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}

  checkTouch1(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  onChange() {
    this.loading = true;
    const passwords = this.resetFormGroup.value;
    const { password, repass } = passwords;
    console.log(this.router.url); // TODO check it,then take token
  }

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
