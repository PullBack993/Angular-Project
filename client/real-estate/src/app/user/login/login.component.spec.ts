import { ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {  Observable, of} from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check submit button(disabled)', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#submit-btn');
    expect(button.disabled).toBeTrue();
  });

  it('should check submit button(active)', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#submit-btn');
    component.loginFormGroup.get('email')?.setValue('user@email.com');
    component.loginFormGroup.get('password')?.setValue('12345');

    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();
  });

  it('should test checkTouch method', () => {
    component.loginFormGroup.controls['email'].markAsTouched();

    fixture.detectChanges();

    expect(component.checkTouch('email', component.loginFormGroup)).toBeTrue();
  });

  it('should load userService(login)', fakeAsync(() => {
    userService = TestBed.inject(UserService);
    const fakeRes: Observable<void> = of(undefined);
    spyOn(userService, 'login').and.callFake(() => fakeRes);

    tick();
    fixture.detectChanges();
    component.onLogin();

    expect(userService.login).toHaveBeenCalled();
  }));
});
