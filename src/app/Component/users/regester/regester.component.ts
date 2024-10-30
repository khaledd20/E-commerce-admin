import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServicesService } from 'src/app/Services/users-services.service';
import { RegesterViewModel } from 'src/app/ViewModels/RegesterViewModel';
import { User } from 'src/Models/User';
import { emailCheckerAsync } from '../CustomValidator/email-checker-async.service';
import { MobilePattern } from '../CustomValidator/mobile-pattern.service';
import { passwordMatchValidator } from '../CustomValidator/password-match-validator.service';
import { userNameChecker } from '../CustomValidator/user-name-checker.service';
@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrls: ['./regester.component.scss']
})
export class RegesterComponent implements OnInit {
  user:RegesterViewModel={} as RegesterViewModel
  userRegesterFormGroup:FormGroup
  rejex = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$"
    constructor( private  fb: FormBuilder , private router: Router ,private userApi:UsersServicesService)
     {
      this.userRegesterFormGroup=fb.group({
        name:['',[Validators.required, Validators.minLength(5)]],
        email:['',[Validators.email , Validators.required],[emailCheckerAsync(userApi)]],
        username:['',Validators.required,[userNameChecker(userApi)]],
        phoneNumber: fb.array([''],[Validators.required,MobilePattern]),
        address:fb.group({
          street:['',Validators.required],
          postalCode:['',Validators.required],
          city:['',Validators.required]
        }),
        password:['',[Validators.required, Validators.minLength(6),Validators.pattern(this.rejex)]],
        confirmPassword:['',[Validators.required, Validators.minLength(6),Validators.pattern(this.rejex)]]
      },{ validators: passwordMatchValidator})
    }
  get name(){
    return this.userRegesterFormGroup.controls['name'];
  }
  get email(){
    return this.userRegesterFormGroup.controls['email'];
  }

  get password(){
    return this.userRegesterFormGroup.controls['password'];
  }
  get username(){
    return this.userRegesterFormGroup.controls['username'];
  }
  get confirmPassword(){
    return this.userRegesterFormGroup.controls['confirmPassword'];
  }
  get mobileNoArr(): FormArray {
    return this.userRegesterFormGroup.controls['phoneNumber'] as FormArray;
  }
  get street(){
   var address =  this.userRegesterFormGroup.controls['address'] as FormGroup;
   return address.controls['street']
  }
  get postalCode(){
    var address =  this.userRegesterFormGroup.controls['address'] as FormGroup;
    return address.controls['postalCode']
   }
  get city(){
    var address =  this.userRegesterFormGroup.controls['address'] as FormGroup;
    return address.controls['city']
   }
   addMobile(){
      this.mobileNoArr.push(this.fb.control('',[Validators.pattern("^01[0-9]{9}$"),Validators.required]));

   }
   removeMobile(i:number){
  this.mobileNoArr.removeAt(i)
   }

    ngOnInit(): void {
    }


    register(){
      console.log("FormGroup Values")
      console.log(this.userRegesterFormGroup.value)
      let regestered:RegesterViewModel = {} as RegesterViewModel
      regestered.confirmPassword = this.confirmPassword.value
      regestered.email = this.email.value
      regestered.name = this.name.value
      regestered.password = this.password.value
      regestered.phoneNumber = this.mobileNoArr.value[0]
      regestered.postalCode = (this.postalCode.value).toString()
      regestered.city = this.city.value
      regestered.username = this.username.value
      regestered.street = this.street.value

      console.log(" regestered Info ")
      console.log(regestered)

      this.userApi.addNewUser(regestered).subscribe(
        x => {
          alert("Success Operation")
          this.router.navigate(['/dashBoard/user'])
        this.user=x
        }
      )
    }
  }
