import { Injectable } from '@angular/core';
import { cake } from '../model/cake';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: cake[] = [];

  constructor(private http:HttpClient) { }
  url="http://localhost:3000/cart";

 addToCart(cake: any) {
   return this.http.post(this.url,cake);
  }
  getCartItems(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?email=${email}`);
  }

  removeFromCart(i: number) {
    return this.http.delete(`${this.url}/${i}`);
  }

  clearCart(userEmail: string): Observable<any> {
    // Step 1: Fetch all cart items for the given email
    return this.getCartItems(userEmail).pipe(
      // Step 2: For each cart item, delete it by its id
      switchMap(cartItems => {
        // Create an array of delete requests
        const deleteRequests = cartItems.map(item => 
          this.removeFromCart(item.id)
        );
        // Step 3: Use forkJoin to execute all delete requests in parallel
        return forkJoin(deleteRequests);
      })
    );
  }
  
  


}