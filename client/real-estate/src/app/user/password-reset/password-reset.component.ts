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

  constructor(private router: Router, private fb: FormBuilder) {}

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  get passwordsGroup(): FormGroup {
    return this.resetFormGroup.controls['passwords'] as FormGroup;
  }

  resetFormGroup: FormGroup = this.fb.group({
    passwords: new FormControl({
      password: this.passwordControl,
      rePass: new FormControl('', [passwordChecker(this.passwordControl)])
    })
  });

  ngOnInit(): void {}

  checkTouch(controlName: string, sourceGroup: FormGroup) {
    console.log('da');
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  

  onChange() {
    this.loading = true;
    const passwords = this.resetFormGroup.value;
    const { password, repass } = passwords;
    console.log(this.router.url); // TODO check it,then take token
  }
}
