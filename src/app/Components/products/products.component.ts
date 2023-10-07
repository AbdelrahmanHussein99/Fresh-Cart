import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttexPipe } from 'src/app/core/pipe/cuttex.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,SearchPipe,FormsModule,CuttexPipe,RouterLink,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  term:string=''
    wishlistDetails:string[]=[]
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;
  constructor(private _WishlistService:WishlistService,private _Renderer2:Renderer2,private _ProductService:ProductService,private _CartService:CartService,private _ToastrService:ToastrService) { }
  ngOnInit(): void {
        this._ProductService.getProducts().subscribe({
      next: (res) => {
            this.products = res.data;
            this.pageSize = res.metadata.limit;
            this.currentPage = res.metadata.currentPage;
            this.total = res.results;
        console.log("p",res.data);
        
      }
        });
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
  pageChanged(e: any) {
    this._ProductService.getProducts(e).subscribe({
      next: (res) => {
        scrollTo(0,0)
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
        console.log("p",res.data);
      }
    });
    console.log(e);
    
  }
    addProductWishlist(ID:string): void{
    this._WishlistService.addToWishlist(ID).subscribe({
      next: (res) => {
        this._WishlistService.wishlistNumber.next(res.data.length)
        this._ToastrService.success(res.message)
        this.wishlistDetails=res.data
        console.log(res);
        
      }
    })
  }
    removeWish(ID: string): void{
    this._WishlistService.removeWishlist(ID).subscribe({
      next: (res) => {
        this._WishlistService.wishlistNumber.next(res.data.length)
        this.wishlistDetails=res.data
        this._ToastrService.success(res.message)
        console.log(res);
      }
    })
  }
}
