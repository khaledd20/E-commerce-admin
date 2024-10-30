
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { UserDataSourceService } from 'src/app/Services/user-data-source.service';
import { UsersServicesService } from 'src/app/Services/users-services.service';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-details',
  templateUrl: './user.details.component.html',
  styleUrls: ['./user.details.component.scss']
})
  
export class UserDetailsComponent implements OnInit, OnDestroy {
  dataSource: UserDataSourceService;
  user: User | undefined;
  subscriptions: Subscription[] = [];
  userId!: string;

  constructor(
    private userService: UsersServicesService,
    private route: ActivatedRoute
  ) {
    this.dataSource = new UserDataSourceService(this.userService);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('pid') || '';
      if (this.userId) {
        this.loadUserDetails();
      }
    });
  }

  loadUserDetails(): void {
    this.userService.getUserByID(this.userId).subscribe(
      (userData) => {
        this.user = userData;
        console.log(this.user); // Debugging output to ensure user data is retrieved.
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}