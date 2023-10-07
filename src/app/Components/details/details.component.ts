import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  productID!: string | null;
  productDetailes:any=null
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService:ProductService,private _Renderer2: Renderer2,private _CartService:CartService,private _ToastrService:ToastrService) { }
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productID = params.get('id')
      }
    })
    this._ProductService.getProductDetails(this.productID).subscribe({
      next: (res) => {
        this.productDetailes = res.data;
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }
}
