import { AbstractControl } from '@angular/forms';

export function passwordChecker(passwordFormControl: AbstractControl) {
  return (rePassFormControl: AbstractControl) => {
    if (passwordFormControl.value !== rePassFormControl.value) {
      return { passwordMissmatch: true };
    }
    return null;
  };
}


