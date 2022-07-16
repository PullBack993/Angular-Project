import { AbstractControl, FormControl } from '@angular/forms';

export function passwordChecker(passwordFormControl: AbstractControl) {
  return (rePassFormControl: AbstractControl) => {
    if (passwordFormControl.value !== rePassFormControl.value) {
      return { passwordMissmatch: true };
    }
    return null;
  };
}


export function checkBuyPrice(control: AbstractControl)  {
  return (value: any) => {
    
    if (control.value < value.value) {
      return { valid: true }
    }
    return null

  }

  
}