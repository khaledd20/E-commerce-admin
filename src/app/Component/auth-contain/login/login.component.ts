import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServicesService } from 'src/app/Services/auth-services.service';
import { UsersServicesService } from 'src/app/Services/users-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  subscription!:Subscription
  Login:FormGroup
  errorMsg:null|string

  constructor(private  fb: FormBuilder, private router: Router, private auth:AuthServicesService )
  {

    this.Login = fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
    this.errorMsg =null
  }
  get username(){
    return this.Login.controls['username'];
  }
  get password(){
    return this.Login.controls['password'];
  }
  register(){

  this.subscription = this.auth.login(this.Login.value).subscribe(
      {
        next: (v) => { this.errorMsg = null;this.router.navigate(['/dashBoard'])},
        error: (e) => {this.errorMsg = e.error
          console.log(e.error)
        }
       }
    )
  }
  ngOnInit(): void {
  }

}
