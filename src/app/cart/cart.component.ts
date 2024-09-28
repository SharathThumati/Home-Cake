import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { OrderService } from '../services/order.service';
import { SnackbarService } from '../services/snackbar.service';
import { Order } from '../model/order';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  availableWeights: number[] = [0.5, 1, 1.5, 2, 2.5]; 
  deliveryMethod: string = 'Door-Delivery'; // Default delivery method
  minDate: Date = new Date();
  storePickUpOrder: Order = {};
  user: User = {};
  doorDeliveryOrder: Order = {};

  constructor(private cartService: CartService, 
              private router: Router, 
              private loginService: LoginService,
              private orderService: OrderService,
              private snackbar: SnackbarService,
            private userService:UserService) { }

  ngOnInit(): void {
    this.get();
    this.userDetails();
  }

  get() {
    const userEmail = this.loginService.userEmail;
    this.cartService.getCartItems(userEmail).subscribe((data) => {
      this.cartItems = data;
      this.cartItems.forEach(item => {
        item.selectedWeight = 1; // Default weight
        item.selectedQuantity = 1;
        item.messageOnCake=""; // Default quantity
      });
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, cake) => {
      return total + (cake.price * cake.selectedWeight * cake.selectedQuantity);
    }, 0);
  }

  removeFromCart(cakeId: number) {
    if(confirm("Do you want to remove...!")){
      this.cartService.removeFromCart(cakeId).subscribe(() => {
        this.get();  
      });
    }
  }

 

  // New method for submitting the order form
  submitOrderForm() {
    const userEmail = this.loginService.userEmail;
  
    // Validate address fields for Door Delivery
    if ((this.deliveryMethod === 'Door-Delivery') && (!this.doorDeliveryOrder.street || !this.doorDeliveryOrder.city || !this.doorDeliveryOrder.zipCode)) {
      this.snackbar.openScakBar('Please fill out the address form!', 'error');
      return;
    } else if ((this.deliveryMethod === 'Store-Pickup') && (!this.storePickUpOrder.firstName || !this.storePickUpOrder.lastName || !this.storePickUpOrder.phone)) {
      this.snackbar.openScakBar('Please fill out the address form!', 'error');
      return;
    }
  
    this.cartItems.forEach(cake => {
      const order: Order = {
        email: userEmail,
        firstName: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.firstName : this.storePickUpOrder.firstName,
        lastName: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.lastName : this.storePickUpOrder.lastName,
        phone: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.phone : this.storePickUpOrder.phone,
        street: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.street : 'N/A',
        city: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.city : 'N/A',
        state: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.state : 'N/A',
        zipCode: this.deliveryMethod === 'Door-Delivery' ? this.doorDeliveryOrder.zipCode : 'N/A',
        totalAmount: cake.price * cake.selectedWeight * cake.selectedQuantity,
        itemName: cake.name,
        date: this.doorDeliveryOrder.date,
        weight: cake.selectedWeight,
        NoOfItems: cake.selectedQuantity,
        messageOnCake: cake.messageOnCake,
        deliveryType: this.deliveryMethod,
        cakeId: cake.id,
        type:cake.productInfo.type
      };
  
      this.orderService.submitOrder(order).subscribe(() => {
        this.snackbar.openScakBar('Order placed successfully!', 'success');
        // Clear the cart for the specific user by email after placing the order
        this.cart();
      });
    });
  }
  cart(){
    this.cartService.clearCart(this.loginService.userEmail).subscribe(() => {
    console.log("sucess");
    this.router.navigate(['viewallcakes']);
  });

  }
  
  userDetails() {
    // Fetch the user details and pre-fill both online and offline order forms
    this.userService.checkIfUserExit(this.loginService.userEmail).subscribe((data) => {
      this.user = data[0];
      // Pre-fill both forms
      this.doorDeliveryOrder.firstName = this.user.firstName;
      this.doorDeliveryOrder.lastName = this.user.lastName;
      this.doorDeliveryOrder.phone = this.user.phone;
      this.doorDeliveryOrder.city=this.user.address?.city,

      this.doorDeliveryOrder.street=this.user.address?.street,
    
    this.doorDeliveryOrder.state=this.user.address?.state,
    this.doorDeliveryOrder.zipCode=this.user.address?.zipCode,
  
      this.storePickUpOrder.firstName = this.user.firstName;
      this.storePickUpOrder.lastName = this.user.lastName;
      this.storePickUpOrder.phone = this.user.phone;
    });
}
increaseQuantity(cake: any) {
  if (cake.selectedQuantity < 10) {
      cake.selectedQuantity++;
      this.calculateTotalPrice();
  }
}

decreaseQuantity(cake: any) {
  if (cake.selectedQuantity > 1) {
      cake.selectedQuantity--;
      this.calculateTotalPrice();
  }
}


}
