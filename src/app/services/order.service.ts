import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  placeOrder(order: Order) {
    throw new Error('Method not implemented.');
  }
URL:string='http://localhost:3000/orders';
  constructor(private http:HttpClient) { }
  
  submitOrder(order: any): Observable<any> {
    return this.http.post(this.URL, order);
  }
  getAllOrderReqeusts(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL)
  }

  getOrderDetails(email: any): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:3000/orders?email="+email)
  }
  
}
