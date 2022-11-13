import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordChecker } from '../util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  loading: boolean = false;

  showPassword: boolean = false;
  focus: boolean = false;
  focus1: boolean = false;
  focusOut: boolean = false;
  focusOut1: boolean = false;
  setColor: boolean = false;
  resetFormGroup: FormGroup = this.fb.group(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      rePass: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    {
      validators: passwordChecker,
    }
  );

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetFormGroup.controls['validators'].valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
  }

  checkTouch1(controlName: string, sourceGroup: FormGroup) {
    return (
      sourceGroup.controls[controlName]?.touched &&
      sourceGroup.controls[controlName]?.invalid
    );
  }

  onChange() {
    this.loading = true;
    const passwords = this.resetFormGroup.value;
    const { password, repass } = passwords;
    console.log(this.router.url); // TODO check it,then take token
  }

  onFocus(event: Event, field: string) {
    const isValue = (event.target as HTMLInputElement).value;
    if (field === 'password') {
      this.focusOut = false;

      if (!this.focus || !isValue) {
        this.focus = true;
      }
    } else if (field === 'rePass') {
      this.focusOut1 = false;
      if (!this.focus1 || !isValue) {
        this.focus1 = true;
      }
    }
  }

  onFocusOut(event: Event, field: string) {
    const isValue = (event.target as HTMLInputElement).value;
    if (field === 'password') {
      if (!isValue) {
        this.focus = false;
        this.focusOut = true;
      }
    } else if (field === 'rePass') {
      if (!isValue) {
        console.log('rePass1');
        this.focus1 = false;
        this.focusOut1 = true;
      }
    }
  }
}
