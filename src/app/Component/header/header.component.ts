import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServicesService } from 'src/app/Services/auth-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:Observable<boolean>
  constructor( private auth:AuthServicesService , private router:Router) {
    this.isLoggedIn = auth.isLoggin()
  }

  ngOnInit(): void {
  }
  logout(){
this.auth.logout()
this.router.navigate(['admin/login']);
  }
}
