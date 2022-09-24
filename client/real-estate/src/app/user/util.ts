import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

// export function passwordChecker(passwordFormControl: AbstractControl) {
//   return (rePassFormControl: AbstractControl) => {
//     if (passwordFormControl.value !== rePassFormControl.value) {
//       console.log(passwordFormControl, rePassFormControl);
//       return { passwordMissmatch: true };
//     }
//     return null;
//   };
// }

export function passwordChecker(passwordFormControl: AbstractControl) {
  const validtorFn: ValidatorFn = (rePasswordFormControl: AbstractControl) => {
    if (passwordFormControl.value !== rePasswordFormControl.value) {
      
      return {
        passwordMissmatch: true
      };
    }

    return null;
  };

  return validtorFn;
}


export function checkBuyPrice(control: AbstractControl)  {
  return (value: any) => {
    
    if (control.value < value.value) {
      return { valid: true }
    }
    return null

  }

  
}