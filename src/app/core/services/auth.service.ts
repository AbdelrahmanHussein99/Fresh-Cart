import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }
  userInfo: any;
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/auth/"
  register(userData:object): Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signup',userData)
  }
   signin(userData:object): Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signin',userData)
   }
  decodeUser(): void{
    const encode = localStorage.getItem('utoken');
    if (encode!== null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
    }
  }
}
