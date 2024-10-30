import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServicesService } from 'src/app/Services/auth-services.service';
import { UsersServicesService } from 'src/app/Services/users-services.service';
import { UserRoleViewModel } from 'src/app/ViewModels/UserRoleViewModel';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-add-rolle',
  templateUrl: './add-rolle.component.html',
  styleUrls: ['./add-rolle.component.scss']
})
export class AddRolleComponent implements OnInit {
  subscription!:Subscription
  AddRole:FormGroup
  errorMsg:null|string
  Roles :string[]=[]
  UserNames: UserRoleViewModel[]=[];
  constructor(private  fb: FormBuilder, private router: Router, private auth:AuthServicesService , private userServ:UsersServicesService) {
    this.userServ.getAllRoles().subscribe(x=>{
      this.Roles = x;
    })
    this.userServ.getAllUsersForRole().subscribe(x=>this.UserNames = x);
    this.AddRole = fb.group({
      userId:[this.UserNames[0],Validators.required],
      Role:[this.Roles[0],Validators.required]
    })
    this.errorMsg =null
  }
  get userId(){
    return this.AddRole.controls['userId'];
  }
  get Role(){
    return this.AddRole.controls['Role'];
  }
  Submit(){
console.log(this.AddRole.value)
  this.subscription = this.userServ.AddRole(this.AddRole.value).subscribe(
      {
        next: (v) => { this.errorMsg = null;this.router.navigate(['/dashBoard/user'])},
        error: (e) => {this.errorMsg = e.error.message
          console.log(e.error.message)
        }
       }
    )
  }
  ngOnInit(): void {
  }

}
