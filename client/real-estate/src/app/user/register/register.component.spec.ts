import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check submit button(disabled)', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#reg-btn');
    expect(button.disabled).toBeTrue();
  });

  it('should check form is valid and submit button is active', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#reg-btn');
    component.registerFormGroup.get('username')?.setValue('user123');
    component.registerFormGroup.get('email')?.setValue('user@mail.com');
    let passwordsControl = component.registerFormGroup.get('passwords');
    passwordsControl?.get('password')?.setValue('12345');
    passwordsControl?.get('rePass')?.setValue('12345');
    
    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();
  });
});
