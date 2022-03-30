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
    this.errorMessage = '';

    const { email, password } = this.loginFormGroup.value;
    const body = { email, password };

    this.userService.login$(body).subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigate(['']);
      },
      complete: () => {
        console.log('login stream completed');
      },
      error: (err) => {
        console.log(err.error.message);
        if (err.error.message == "User don't exist!") {
          this.errorMessage = 'Грешна парола или имейл';
        } else {
          this.errorMessage = err.error.message;
        }
        this.loading = false;
      }
    });
  }
}
