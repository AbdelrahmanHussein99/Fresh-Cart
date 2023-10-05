import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CuttexPipe } from 'src/app/core/pipe/cuttex.pipe';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttexPipe,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  constructor(private _Renderer2:Renderer2,private _ProductService:ProductService,private _CartService:CartService,private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data
        console.log("p",res.data);
        
      }
    });
    this._ProductService.getGategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log("c",res.data);
      }
    })
  }
  addProduct(ID: string, el: HTMLButtonElement): void {
    this._Renderer2.setAttribute(el,"disabled","true")
    this._CartService.addToCart(ID).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this._Renderer2.removeAttribute(el, "disabled");
      },
      error: (err) => {
        this._Renderer2.removeAttribute(el, "disabled");
      }
    })
  }
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed:1000,
    items: 1,
    nav: false
  }

}
