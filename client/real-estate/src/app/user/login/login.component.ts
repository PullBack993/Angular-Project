import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loading: boolean = false;

  loginFormGroup: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  checkTouch(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  onLogin(): void {
    this.loading = true;

    const { email, password } = this.loginFormGroup.value;
    const body = { email, password };

    this.userService.login(body)
  }
}