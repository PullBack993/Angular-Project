import { AbstractControl } from '@angular/forms';

export function passwordChecker(passwordFormControl: AbstractControl) {
  const password = passwordFormControl.value.password;
  const rePass = passwordFormControl.value.rePass;
  if (password !== '' && rePass != '') {
    if (password !== rePass) {
      passwordFormControl.get('rePass')?.setErrors({ mismatch: true });
      return {mismatch: true}
    } if (password == rePass) {
      passwordFormControl.get('rePass')?.setErrors(null);
      return {mismatch: null}
    } else {
      return null
    }
  }else{ return null }
}

export function checkBuyPrice(control: AbstractControl) {
  return (value: any) => {
    if (control.value < value.value) {
      return { valid: true };
    }
    return null;
  };
}
