import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {
  categoryID: string | null = '';
  CategoryDetails: Category = {} as Category;
  subCategories: any = [];
constructor(private _ProductService:ProductService,private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryID=params.get('id')
      }
    })
    this._ProductService.getGategoryDetails(this.categoryID).subscribe({
      next: (res) => {
        this.CategoryDetails=res.data
        console.log(res);
        
      }
    })
    this._ProductService.getSubGategory(this.categoryID).subscribe({
      next: (res) => {
        this.subCategories=res.data
        console.log(res.data);
        
      }
    })
  }
}
