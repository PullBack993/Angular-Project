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
    })
      it('should test form controller(validity)', () => {
        expect(component.loginFormGroup.valid).toBeFalsy();
      });
})