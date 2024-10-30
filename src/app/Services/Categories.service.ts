import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from 'src/Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) { }

 getAllCategories(): Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(`${environment.APIBaseURL}/api/Category`)
  }
}
