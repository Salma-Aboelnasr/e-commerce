import { Router } from '@angular/router';
import { observable } from './../../../../../node_modules/@compodoc/compodoc/node_modules/rxjs/src/internal/symbol/observable';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData :any;
  private readonly router= inject(Router);
  //  token = localStorage.getItem("token");

  constructor(private httpClient:HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }
  sendRegisterForm(data:object): Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  sendLoginForm(data:object): Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }
  getUserData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem("token");
      if (token) {
        this.userData = jwtDecode(token);
        console.log(this.userData);
      }
    }
  }
  getUserId(): string | null {
    return this.userData ? this.userData.id : null;
  }
  logout():void{
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  setEmailVerify(data:object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }

  setCodeVerify(data:object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }

  resetPassword(data:object): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
}
