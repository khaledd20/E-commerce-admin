import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServicesService } from 'src/app/Services/product-services.service';
import { ProductModel } from 'src/Models/ProductModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  product:ProductModel |undefined
  currentPrdId:number = 0
  constructor(public service:ProductServicesService ,
    private location:Location ,
    private router:Router,
    public activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramMap=>{
      this.currentPrdId = Number(paramMap.get("pid"));
      console.log(paramMap)
      this.service.getProductByID(this.currentPrdId).subscribe(product=>{
        this.product = product
        console.log(this.product)
      });
    });

  }
  goBack(){
    this.location.back();
  }
}
