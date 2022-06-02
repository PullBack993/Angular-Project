import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

describe('Login form controller', () => {
  let component: LoginComponent;
  let userService: UserService;

  beforeEach(() => {
    component = new LoginComponent(new FormBuilder(), userService);
  });

  it('should create a form with 2 controls', () => {
    expect(component.loginFormGroup.contains('email')).toBeTruthy();
    expect(component.loginFormGroup.contains('password')).toBeTruthy();
  });

  it('should test form controller(validity)', () => {
    expect(component.loginFormGroup.valid).toBeFalsy();
  });
    
  //Unhappy path
  it('should make email control required', () => {
    let control = component.loginFormGroup.get('email');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();
  });

  it('should make password control required', () => {
    let control = component.loginFormGroup.get('password');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();
  });
  //Happy path
  it('shoudl make email control pass', () => {
    let control = component.loginFormGroup.get('email');

    control?.setValue('user@email.com');

    expect(control?.valid).toBeTruthy();
  });
    
  it('shoudl make email control pass', () => {
    let control = component.loginFormGroup.get('password');

    control?.setValue('12345');

    expect(control?.valid).toBeTruthy();
  });
});
