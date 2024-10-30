import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from "@angular/forms";

export const MobilePattern: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const mobileNo = control.get('phoneNumber') as FormArray;
  if(mobileNo?.value){
    console.log(mobileNo?.value)
  for(let i = 0;i < mobileNo.value?.length;i++)
  {
    var regexp = new RegExp("^01[0-9]{9}$")
    var result = mobileNo.value[i]?.test(regexp)
    if(!result)
    return {notValidPattern:true}
  }
}
  return mobileNo?.value

};
