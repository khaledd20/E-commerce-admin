import { Injectable } from '@angular/core';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ProductServicesService } from './product-services.service';
import { ProductModel } from 'src/Models/ProductModel';
import { ProductFiltered } from '../ViewModels/ProductFiltered';
@Injectable()
export class ProductDataSourceService {
  private ProductSubject = new BehaviorSubject<ProductModel[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(private proServ: ProductServicesService) { }
  loadProducts(product: ProductFiltered) {

    this.loadingSubject.next(true);

    this.proServ.getFilteredProduct(product).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(products => this.ProductSubject.next(products));

  }

  connect(collectionViewer: CollectionViewer): Observable<ProductModel[]> {
    console.log("Connecting data source");
    return this.ProductSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ProductSubject.complete();
    this.loadingSubject.complete();
  }

}
