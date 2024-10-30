import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/Models/User';
import { ProductFiltered } from '../ViewModels/ProductFiltered';
import { RegesterViewModel } from '../ViewModels/RegesterViewModel';
import { RoleViewModel } from '../ViewModels/RoleViewModel';
import { UserRoleViewModel } from '../ViewModels/UserRoleViewModel';
import { AuthServicesService } from './auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {
  private httpOptions;
  constructor(private httpClient: HttpClient , private auth:AuthServicesService) {
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // , Authorization': 'Token'
      })
   }
  }
  getUserByID(id: string): Observable<User>
  {
    return this.httpClient.get<User>(`${environment.APIBaseURL}/api/Account/${id}`);
  }
  getAllUsers(): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.APIBaseURL}/api/Account`)
  }
  addNewUser(newUser: RegesterViewModel): Observable<RegesterViewModel>
  {
    console.log(newUser)
    return this.httpClient.post<RegesterViewModel>(`${environment.APIBaseURL}/api/Account/register`, newUser,this.httpOptions);
  }
  updateUser(id: number, newUser: User): Observable<User>
  {
    return this.httpClient.patch<User>(`${environment.APIBaseURL}/api/Account/${id}`, JSON.stringify(newUser),this.httpOptions);
  }
  deleteUser(id:number): Observable<User>
  {
    return this.httpClient.delete<User>(`${environment.APIBaseURL}/api/Account/${id}`)
  }
  checkEmail(email:string):Observable<boolean>
  {
    return this.httpClient.get<boolean>(`${environment.APIBaseURL}/api/Account/check?email=${email}`);
  }
  checkUser(userName:string):Observable<boolean>
  {
    return this.httpClient.get<boolean>(`${environment.APIBaseURL}/api/Account/check?username=${userName}`);
  }
  getFilteredUser(product: ProductFiltered): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.APIBaseURL}/api/Account/filter?page=${product.page}&size=${product.size}&order=${product.order}&filter=${product.filter}&id=${product.id}`);
  }
  getAllRoles(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.APIBaseURL}/api/Account/Rolles`);
  }
  AddRole(rolle:RoleViewModel): Observable<RoleViewModel> {
    return this.httpClient.post<RoleViewModel>(`${environment.APIBaseURL}/api/Account/addrole`,JSON.stringify(rolle),this.httpOptions);
  }
  getAllUsersForRole(): Observable<UserRoleViewModel[]>
  {
    return this.httpClient.get<UserRoleViewModel[]>(`${environment.APIBaseURL}/api/Account`)
  }
}
