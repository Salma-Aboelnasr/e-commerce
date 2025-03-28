import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myToken: string | null = null;

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { 
    if (isPlatformBrowser(this.platformId)) {
      this.myToken = localStorage.getItem('token');
    }
  }

  checkOutPayment(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: data },
      {
        headers: new HttpHeaders({ token: this.myToken || '' }) 
      }
    );
  }

  getAllOrders(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/`);
  }

  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
  }
}
