import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient: HttpClient) { }
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/";

  getProducts(pageNum:number= 1):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products?page=${pageNum}`)
  }
  getGategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl+'categories')
  }
  getGategoryDetails(categoryID:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`categories/${categoryID}`)
  }
  getSubGategory(categoryID:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`categories/${categoryID}/subcategories`)
  }
  getProductDetails(ID:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products/${ID}`)
  }
  getBrands(pageNum:number= 1):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`brands?page=${pageNum}`)
  }
}
