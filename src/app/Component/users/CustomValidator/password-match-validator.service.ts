import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  var res = {passwordMismatch:false , nameInclude:false}
  const pass = control.get('password');
  const name = control.get('name');
  const confirmPass = control.get('confirmPassword');
if(pass && confirmPass && pass.value !== confirmPass.value)
res.passwordMismatch = true
if(name?.value != "" && (pass?.value.includes(name?.value) || confirmPass?.value.includes(name?.value) ))
res.nameInclude = true
if(res.nameInclude || res.passwordMismatch)
  return res
else
return null

};
