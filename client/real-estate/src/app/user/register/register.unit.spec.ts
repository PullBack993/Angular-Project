import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

describe('Register controller', () => {
  let component: RegisterComponent;
  let userService: UserService;

  beforeEach(() => {
    component = new RegisterComponent(new FormBuilder(), userService);
  });

  it('should create a form with 3 controls', () => {
    expect(component.registerFormGroup.contains('username')).toBe(true);
    expect(component.registerFormGroup.contains('email')).toBe(true);
    expect(component.registerFormGroup.contains('passwords')).toBe(true);
  });
  
  it('should make username control required', () => {
    let control = component.registerFormGroup.get('username');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();
  });

  it('should make email control required', () => {
    let control = component.registerFormGroup.get('email');

    control?.setValue('');

    expect(control?.valid).toBeFalsy();
  });

  it('should make passwords/password control required', () => {
    let control = component.registerFormGroup.get('passwords')
    let password = control?.get('password')

        password?.setValue('');

    expect(control?.valid).toBeFalsy();
  });
  
  it('should make passwords/rePass(compare with password) control required', () => {
    let control = component.registerFormGroup.get('passwords');
    let password = control?.get('rePass');

    password?.setValue('12345');

    expect(control?.valid).toBeFalsy();
  });


  // Happy cases
    it('should make passwords/password control pass', () => {
      let control = component.registerFormGroup.get('passwords');
      let password = control?.get('password');

      password?.setValue('12345');

      expect(control?.valid).toBeTrue();
    });
    it('should make passwords/rePass(compare password with repeated password) control pass', () => {
      let control = component.registerFormGroup.get('passwords');
      let password = control?.get('password');
      let rePass = control?.get('rePass');

      password?.setValue('12345');
      rePass?.setValue('12345');

      expect(control?.valid).toBeTrue();
    });


  it('should make username control pass', () => {
    let control = component.registerFormGroup.get('username');

    control?.setValue('te');

    expect(control?.valid).toBeTrue();
  });

  it('should make email control pass', () => {
    let control = component.registerFormGroup.get('email');

    control?.setValue('google@gmail.com');

    expect(control?.valid).toBeTrue();
  });
  it('should make email control pass', () => {
    let control = component.registerFormGroup.get('email');

    control?.setValue('user@localserver');

    expect(control?.valid).toBeTrue();
  });
});
