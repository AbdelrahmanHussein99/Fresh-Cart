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
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttexPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  term: string = '';
  products: Product[] = [];
  categories: Category[] = [];
  wishlistDetails:string[]=[]

  constructor(private _Renderer2:Renderer2,private _WishlistService:WishlistService,private _ProductService:ProductService,private _CartService:CartService,private _ToastrService:ToastrService) { }
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data
        
      }
    });
    this._ProductService.getGategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    })
      this._WishlistService.getWishlist().subscribe({
        next: (res) => {
          const newDetails = res.data.map((item:any)=>item._id)
      this.wishlistDetails=newDetails
    }
  })
  }
  addProduct(ID: string, el: HTMLButtonElement): void {
    this._Renderer2.setAttribute(el,"disabled","true")
    this._CartService.addToCart(ID).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this._Renderer2.removeAttribute(el, "disabled");
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error: (err) => {
        this._Renderer2.removeAttribute(el, "disabled");
      }
    })
  }
  addProductWishlist(ID:string): void{
    this._WishlistService.addToWishlist(ID).subscribe({
      next: (res) => {
        this._WishlistService.wishlistNumber.next(res.data.length)
        this._ToastrService.success(res.message)
        this.wishlistDetails=res.data
        
      }
    })
  }
    removeWish(ID: string): void{
    this._WishlistService.removeWishlist(ID).subscribe({
      next: (res) => {
        this._WishlistService.wishlistNumber.next(res.data.length)
        this.wishlistDetails=res.data
        this._ToastrService.success(res.message)
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
