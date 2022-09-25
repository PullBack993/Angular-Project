import { AbstractControl, FormControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

// export function passwordChecker(passwordFormControl: AbstractControl) {
//   return (rePassFormControl: AbstractControl) => {
//     if (passwordFormControl.value !== rePassFormControl.value) {
//       console.log(passwordFormControl, rePassFormControl);
//       return { passwordMissmatch: true };
//     }
//     return null;
//   };
// }

export function confirmedValidation(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function passwordChecker(passwordFormControl: AbstractControl) {
  const password = passwordFormControl.value.passwords.password;
  const rePass = passwordFormControl.value.passwords.rePass;
  if (password !== '' && rePass != '') {
    if (password !== rePass) {
      passwordFormControl.get('passwords.rePass')?.setErrors({ mismatch: true });
      return {mismatch: true}
    } if (password == rePass) {
      passwordFormControl.get('passwords.rePass')?.setErrors(null);
      return {mismatch: null}
    } else {
      return null
    }
  }
  else
  {
    return null;
  }
}

export function checkBuyPrice(control: AbstractControl) {
  return (value: any) => {
    if (control.value < value.value) {
      return { valid: true };
    }
    return null;
  };
}
