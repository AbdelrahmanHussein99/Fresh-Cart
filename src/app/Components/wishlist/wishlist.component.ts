import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { RouterLink } from '@angular/router';
import { CuttexPipe } from 'src/app/core/pipe/cuttex.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,CuttexPipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products:Product[]=[]
constructor(private _Renderer2:Renderer2,private _WishlistService:WishlistService,private _ProductService:ProductService,private _CartService:CartService,private _ToastrService:ToastrService){}
  ngOnInit(): void {
  this._WishlistService.getWishlist().subscribe({
    next: (res) => {
      this.products = res.data;
      console.log(res);
      
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
        this._ToastrService.success(res.message)
        console.log(res);
        
      }
    })
  }
  //remove in wishlist
  removeWish(ID: string): void{
    this._WishlistService.removeWishlist(ID).subscribe({
      next: (res) => {
        this._WishlistService.wishlistNumber.next(res.data.length)
        this._ToastrService.success(res.message)
        this._WishlistService.getWishlist().subscribe({
          next: (res) => {
          this.products = res.data;
          
      
    }
          })
      }
    })
  }
}
