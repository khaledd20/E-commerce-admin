import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatInputModule} from '@angular/material/input'
import { MatSortModule } from '@angular/material/sort';
import { NewProductComponent } from './new-product/new-product.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
const routes : Routes=[
  {path: 'newProduct', component:NewProductComponent},
  {path: 'updateProduct/:pid', component:NewProductComponent},
  {path: 'detail/:pid', component:DetailComponent},
  {path: '', component:ProductsComponent},

]

@NgModule({
  declarations: [
    ProductsComponent,
    NewProductComponent,
    DetailComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes ),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule
  ]
})
export class ProductsContainModule { }
