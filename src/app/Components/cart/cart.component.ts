import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDetails: any = null;
  constructor(private _CartService:CartService,private _Renderer2:Renderer2){}
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        
      }
    })
  }
  removeItem(ID: string, el: HTMLButtonElement): void{
    this._Renderer2.setAttribute(el,"disabled","true")
    this._CartService.removeCartItem(ID).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(el, "disabled");
        this.cartDetails = res.data;
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
      error: (err) => {
        this._Renderer2.removeAttribute(el, "disabled");
      }
    })
  }
  changeCount(count: number, ID: string, el1: HTMLButtonElement,el2: HTMLButtonElement): void{
    if (count >= 1) {
          this._Renderer2.setAttribute(el1,"disabled","true")
          this._Renderer2.setAttribute(el2,"disabled","true")
    this._CartService.updateItemCount(count, ID).subscribe({
      next: (res) => {
        this._Renderer2.removeAttribute(el1, "disabled");
        this._Renderer2.removeAttribute(el2, "disabled");
        this.cartDetails = res.data;
      },
      error: (err) => {
        this._Renderer2.removeAttribute(el1, "disabled");
        this._Renderer2.removeAttribute(el2, "disabled");
      }
    })
    }
  }
  clearAll(): void{
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.cartDetails = null;
          this._CartService.cartNumber.next(0)
        }
      },
      error: (err) => {
      }
    })
  }
}
