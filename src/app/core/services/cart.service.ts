import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient:HttpClient) { }

  cartNumber :BehaviorSubject<number>=new BehaviorSubject(0);
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/"
  addToCart(prodID:string): Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'cart',
    {
      productId: prodID
    })
  }
  getUserCart(): Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'cart')
  }
  removeCartItem(prodID:string): Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${prodID}`)
  }
  updateItemCount(itemCount:number,prodID:string): Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${prodID}`,
      {
      count:itemCount
    })
  }
    clearCart(): Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart`)
    }
  chechOut(CartID: string | null, orderInfo: object): Observable<any>{
    return this._HttpClient.post(this.baseUrl + `orders/checkout-session/${CartID}?url=http://localhost:4200`,
    {
      shippingAddress:orderInfo
      })
  }
}
