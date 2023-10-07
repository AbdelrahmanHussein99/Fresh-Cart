import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  constructor(private _ProductService:ProductService) { }
  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      },
    })
  }
    pageChanged(e: any) {
    this._ProductService.getBrands(e).subscribe({
      next: (res) => {
        scrollTo(0,0)
        this.brands = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
      }
    });
  }
}
