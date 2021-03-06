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

  passwordControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePass: new FormControl('', [passwordChecker(this.passwordControl)])
    })
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

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
    const body = { username, email, password, repass: rePass };

    this.userService.register(body);
  }
}
