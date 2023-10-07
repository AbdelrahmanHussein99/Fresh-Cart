import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {
  baseUrl: string = "https://ecommerce.routemisr.com/api/v1/auth/"
  constructor(private _HttpClient: HttpClient) { }

  forgotPassword(userEmail:object): Observable<any>{
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`,userEmail)
  }
  resetCode(resetCode:object): Observable<any>{
    return this._HttpClient.post(this.baseUrl + `verifyResetCode`,resetCode)
  }
  resetpassword(resetPassObj:object): Observable<any>{
    return this._HttpClient.put(this.baseUrl + `resetPassword`,resetPassObj)
  }
}
