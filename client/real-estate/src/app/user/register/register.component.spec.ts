import { ComponentFixture, TestBed,fakeAsync,tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let onRegisterBtn: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);

    component = fixture.componentInstance;
    onRegisterBtn = fixture.debugElement.nativeElement.querySelector('#reg-btn');


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check submit button(disabled)', () => {
    expect(onRegisterBtn.disabled).toBeTrue();
  });

  it('should check form is valid and submit button is active', () => {
    const onRegisterBtn = fixture.debugElement.nativeElement.querySelector('#reg-btn');
    component.registerFormGroup.get('username')?.setValue('user123');
    component.registerFormGroup.get('email')?.setValue('user@mail.com');
    let passwordsControl = component.registerFormGroup.get('passwords');
    passwordsControl?.get('password')?.setValue('12345');
    passwordsControl?.get('rePass')?.setValue('12345');
    
    fixture.detectChanges();

    expect(onRegisterBtn.disabled).toBeFalsy();
  });
   it('shoud test checkTouch method', () => {
     component.registerFormGroup.controls['username'].markAsTouched();

     fixture.detectChanges()
     
     expect(component.checkTouch('username', component.registerFormGroup)).toBeTrue();
   });
  it('should check buttom onRegister', () => {
    const onRegisterBtn = fixture.debugElement.nativeElement.querySelector('#reg-btn');   
    onRegisterBtn.click();

    fixture.detectChanges()

    expect(component.errorMessage).toBe('')
    expect(component.loading).toBeTrue
  });

   it('should load userService(register)', fakeAsync(() => {
     userService = TestBed.inject(UserService);
     const fakeRes: Observable<void> = of(undefined);
     spyOn(userService, 'register').and.callFake(() => fakeRes);

     tick();
     fixture.detectChanges();
     component.onRegister();

     expect(userService.register).toHaveBeenCalled();
   }));
});
