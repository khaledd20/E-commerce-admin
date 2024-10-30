import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { User } from 'src/Models/User';
import { UsersServicesService } from './users-services.service';
import { ProductFiltered } from '../ViewModels/ProductFiltered';

@Injectable({
  providedIn: 'root'
})
export class UserDataSourceService {
  private UserSubject = new BehaviorSubject<User[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(private proServ: UsersServicesService) { }
  loadUsers(user: ProductFiltered) {

    this.loadingSubject.next(true);

    this.proServ.getFilteredUser(user).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(Users => this.UserSubject.next(Users));

  }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    console.log("Connecting data source");
    return this.UserSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.UserSubject.complete();
    this.loadingSubject.complete();
  }

}
