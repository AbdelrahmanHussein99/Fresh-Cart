import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient:HttpClient) { }
  userToken: any = {
  token:localStorage.getItem('utoken')
  }
  cartNumber :BehaviorSubject<number>=new BehaviorSubject(0);
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/"
  
  addToCart(prodID:string): Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'cart',
    {
      productId: prodID
    },
    {
      headers: this.userToken
    }
    
    )
  }
  getUserCart(): Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'cart',
    {
      headers: this.userToken
    }
    
    )
  }
  removeCartItem(prodID:string): Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${prodID}`,
    {
      headers: this.userToken
    }
    )
  }
  updateItemCount(itemCount:number,prodID:string): Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${prodID}`,
      {
      count:itemCount
    },
    {
      headers: this.userToken
    }
    )
  }
    clearCart(): Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart`,
    {
      headers: this.userToken
    }
    )
  }
}
