import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient) { }
  wishlistNumber :BehaviorSubject<number>=new BehaviorSubject(0);
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/";
  addToWishlist(prodID:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'wishlist', {
      productId:prodID
    })
  }
  getWishlist():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'wishlist')
  }
  removeWishlist(ID:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `wishlist/${ID}`)
  }
}
