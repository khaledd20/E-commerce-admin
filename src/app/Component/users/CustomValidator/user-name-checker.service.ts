import { AsyncValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UsersServicesService } from 'src/app/Services/users-services.service';

export function userNameChecker(userService: UsersServicesService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    var formm = control as FormControl
    return userService.checkUser(formm.value).pipe(map(
      (IsExist: boolean) => {
        return (IsExist) ? { "UserNameExist": true } : null;
      }
    ));
  };
}
