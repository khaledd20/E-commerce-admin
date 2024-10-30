import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductModel } from 'src/Models/ProductModel';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent, merge, Subscription, tap } from 'rxjs';
import { ProductDataSourceService } from 'src/app/Services/ProductDataSource.service';
import { ProductFiltered } from 'src/app/ViewModels/ProductFiltered';
import { UserDataSourceService } from 'src/app/Services/user-data-source.service';
import { User } from 'src/Models/User';
import { UsersServicesService } from 'src/app/Services/users-services.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AllUsersComponent implements OnInit,AfterViewInit, OnDestroy{
  dataSource: UserDataSourceService;
  subscriptions:Subscription[]=[]
  Users!: User[]
  private paginator!: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
}
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  displayedColumns: string[] = ['id', 'name','CreatedDate'];
  expandedElement: User | null = null;
  constructor(private Userservice: UsersServicesService) {
      this.dataSource = new UserDataSourceService(this.Userservice);
      this.Userservice.getAllUsers().subscribe(x=>this.Users = x);
  }

   ngOnInit():void{
    this.dataSource = new UserDataSourceService(this.Userservice);
   let product :ProductFiltered =
   {page:0,size:3,filter:"",id:0,order: "asc"}
    this.dataSource.loadUsers(product);
    this.loadUsers();
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadUsers())
    )
    .subscribe();
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;

            this.loadUsers();
        })
    ).subscribe();
    console.log("fromAfter")
    console.log(this.Users)
    this.paginator.page.pipe(tap(() => this.loadUsers())).subscribe();

  }
  Delete(productId:number){
    // this.Userservice.deleteProduct(productId);
    this.loadUsers()
  }
  loadUsers(){

    let product :ProductFiltered =
    {page:this.paginator.pageIndex,size:this.paginator.pageSize,filter:this.input.nativeElement.value,
      id:(this.sort.active)?1:0,order: this.sort.direction}

 this.dataSource.loadUsers(product)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(ele=>{
      ele.unsubscribe()
    })
  }

}

