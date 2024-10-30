import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/Services/Categories.service';
import { ProductServicesService } from 'src/app/Services/product-services.service';
import { Category } from 'src/Models/Category';
import { ProductModel } from 'src/Models/ProductModel';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})

export class NewProductComponent implements OnInit {
  currentProduct:ProductModel={} as ProductModel;
  updatedId:number = 0
  categories:Category[]
  uploadFile!: File | null;
  isAdd:Boolean
  constructor(private category:CategoriesService
    ,private router:Router, private activeLink:ActivatedRoute,
    private productService:ProductServicesService) {
    this.categories =[]
      this.isAdd = true
   }
   handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
    }
  }
   saveProduct(){
    if(this.isAdd){
    this.productService.addNewProduct(this.uploadFile!, this.currentProduct).subscribe(x=>{
      this.router.navigate(['dashBoard/product']);
    })}
    else {
      this.productService.updateProduct(this.updatedId ,this.uploadFile!,this.currentProduct).subscribe(x=>{
        this.router.navigate(['dashBoard/product']);
      })
    }

   }
  ngOnInit(): void {
    this.category.getAllCategories().subscribe(cat=>{
      console.log(cat);
      this.categories = cat
    })
    this.activeLink.paramMap.subscribe(para=>{
      if(para.get("pid")){
        this.isAdd = false
      this.updatedId = Number(para.get("pid"))
      this.productService.getProductByID(this.updatedId).subscribe(
        pro=>{this.currentProduct = pro}
      )
    }
    })
  }


}
