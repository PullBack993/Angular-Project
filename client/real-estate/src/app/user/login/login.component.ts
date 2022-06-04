import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit,OnDestroy {
  errorMessage: string = '';
  loading: boolean = false;
  authStatusSubscription!: Subscription

  loginFormGroup: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.authStatusSubscription = this.userService.getAuthStatusListener().subscribe(status => {
      this.loading= false
    })
  }
  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe()
  }

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
