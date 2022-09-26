import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { passwordChecker } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  loading: boolean = false;
  authStatusSubscription!: Subscription;
  constructor(private fb: FormBuilder, private userService: UserService) {}



  registerFormGroup: FormGroup = this.fb.group(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        rePass: new FormControl('', [Validators.required, Validators.minLength(4)]),
    },
    {
      validators: passwordChecker
    }
  );


  ngOnInit(): void {
    this.authStatusSubscription = this.userService.getAuthStatusListener().subscribe((status) => {
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

  checkTouch(controlName: string, sourceGroup: FormGroup) {
    return sourceGroup.controls[controlName]?.touched && sourceGroup.controls[controlName].invalid;
  }

  onRegister() {
    this.loading = true;
    this.errorMessage = '';
    const { username, email, passwords } = this.registerFormGroup.value;
    const { password, rePass } = passwords;
    if (password !== rePass) {
      this.errorMessage = 'Die Passwörter müssen übereinstimmen';
      this.loading = false;

      return;
    }
    const body = { username, email, password, repass: rePass };

    this.userService.register(body);
  }
}
