import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServicesService } from './auth-services.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router , private auth:AuthServicesService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

   if(!this.auth.hasTokken())
   {
      this.router.navigate(['admin/login']);
       return false;
   }
   else{
    let inRolle:Boolean = false
     this.auth.getCurrentRolles().subscribe(x=>
x.map(i=>
  (i=="Admin")?inRolle = true:inRolle))
  
      if(inRolle){

          return true
      }
      this.router.navigate(['admin/login']);
      alert("You Are Not Admin ..Please Login As Admin");
       return false;
   }
  }

}
