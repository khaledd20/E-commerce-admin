import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/Models/ProductModel';
import { ProductFiltered } from '../ViewModels/ProductFiltered';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // , Authorization': 'Token'
      })
    }
  }
  getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${environment.APIBaseURL}/api/Product`)
      .pipe(catchError(this.handleError));
  }
  
  private handleError(error: any) {
    console.error('API error occurred:', error);
    return throwError(error);
  }
  addNewProduct(fileToUpload: File, newPrd: ProductModel): Observable<ProductModel> {
    console.log(newPrd)
    console.log(fileToUpload)
    console.log(fileToUpload.name)
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('name', newPrd.name);
    formData.append('quentity', (newPrd.quantity).toString());
    formData.append('price', (newPrd.price).toString());
    formData.append('categoryId', (newPrd.categoryId).toString());

    console.log(formData.has('name'))

    return this.httpClient.post<ProductModel>(`${environment.APIBaseURL}/api/Product`, formData);

  }
  updateProduct(prdID: number,fileToUpload: File, newPrd: ProductModel): Observable<ProductModel> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('name', newPrd.name);
    formData.append('quentity', (newPrd.quantity).toString());
    formData.append('price', (newPrd.price).toString());
    formData.append('categoryId', (newPrd.categoryId).toString());
    return this.httpClient.patch<ProductModel>(`${environment.APIBaseURL}/api/Product?id=${prdID}`, formData);
  }
  deleteProduct(prdID: number): Observable<ProductModel> {
    return this.httpClient.delete<ProductModel>(`${environment.APIBaseURL}/api/Product/${prdID}`)
  }
  getProductByID(prdID: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${environment.APIBaseURL}/api/Product/${prdID}`);
  }
  getProductsByCatID(catID: number): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${environment.APIBaseURL}/api/Product?cateogry=${catID}`);
  }
  getFilteredProduct(product: ProductFiltered): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${environment.APIBaseURL}/api/Product/filter?page=${product.page}&size=${product.size}&order=${product.order}&filter=${product.filter}&id=${product.id}`);
  }

  
}
