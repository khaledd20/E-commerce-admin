import { AsyncValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UsersServicesService } from 'src/app/Services/users-services.service';

export function emailCheckerAsync(userService: UsersServicesService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var formm = control as FormControl
    return userService.checkEmail(formm.value).pipe(map(
      (IsExist: boolean) => {
        return (IsExist) ? { "EmailExist": true } : null;
      }
    ));
  };
}
