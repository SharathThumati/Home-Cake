import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CakeService } from '../services/cake.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { User } from '../model/user';
import { cake } from '../model/cake';
import { Order } from '../model/order';
import { SnackbarService } from '../services/snackbar.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  mycake: cake = {}
  orderdata: Order={}
  id: any | null;
 
  orderData:Order={}
  selectedQuantity = 0;
  userEnteredQuantity: number = 1;
  totalPrice = 0;

  userDataForOnline: Order = {
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: ""
  };
  userDataForOffline: User = {
    firstName: "",
    lastName: "",
    phone: ""
  };
  minDate: Date = new Date();
  date: string = "";
  messageOnCake: string = "";

  storePickUpOrder: Order = {};
  user: User = {};
  doorDeliveryOrder: Order = {};

  constructor(private rs: ActivatedRoute,
    private cakeserve: CakeService,
    private route: Router,
    private userService:UserService,
    
    public loginservice: LoginService,
    private userservice: UserService,
    private orderservice: OrderService,
    private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.rs.paramMap.subscribe(params => {
      let stdid = params.get("id") ?? 0;
      this.id = stdid;
      this.getOneCake(stdid);
      this.getUser();
      this.calculateTotalPrice();
      this.userData();
    })
  }
  updateQuantity(quantity: number) {
    this.selectedQuantity = quantity;
     this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    // this.orderservice.submitOrder(this.orderData).subscribe((data) => {
    //   this.snackbar.openScakBar('Congrats!!You have ordered Successfully!!', 'success')

    // });
    if (this.mycake.price !== undefined&&this.mycake)
     {
        this.totalPrice = this.mycake.price * this.selectedQuantity * this.userEnteredQuantity;
    } else {
        this.totalPrice = 0;
    }
    
}
  getOneCake(id: any) {
    this.cakeserve.getcakeById(id).subscribe((data) => {
      this.mycake = data;
    })
  }

  getUser() {
    this.userservice.checkIfUserExit(this.loginservice.userEmail).subscribe((data) => {
      this.user = data[0]

    })
  }

  placeOrder() {
    this.doorDeliveryOrder = {

      email: this.user.email,
      firstName: this.userDataForOnline.firstName,
      lastName: this.userDataForOnline.lastName,
      phone: this.userDataForOnline.phone,
      street: this.userDataForOnline.street,
      city: this.userDataForOnline.city,
      state: this.userDataForOnline.state,
      zipCode: this.userDataForOnline.zipCode,
      totalAmount: this.totalPrice,
      itemName: this.mycake.name,
      date: this.date,
      weight:this.selectedQuantity,
      NoOfItems:this.userEnteredQuantity,
      messageOnCake: this.messageOnCake,
      deliveryType: "Door-Delivery",
      cakeId:this.id,
      type:this.mycake.productInfo?.type

    }
    this.orderservice.submitOrder(this.doorDeliveryOrder).subscribe((data) => {
      this.snackbar.openScakBar('Congrats!!You have ordered Successfully!!', 'success')

    })
    this.route.navigate([`viewallcakes`])
    // this.route.navigate([`OrderSummaryComponent/${this.id}`])
  }

  ordernow() {
    this.storePickUpOrder = {
      email: this.user.email,
      firstName: this.userDataForOffline.firstName,
      lastName: this.userDataForOffline.lastName,
      phone: this.userDataForOffline.phone,
      totalAmount: this.totalPrice,
      itemName: this.mycake.name,
      date: this.date,
      weight:this.selectedQuantity,
      NoOfItems:this.userEnteredQuantity,
      messageOnCake: this.messageOnCake,
      deliveryType: "Store-pickUp",
      cakeId:this.id,
      type:this.mycake.productInfo?.type

      
      
    }
    this.orderservice.submitOrder(this.storePickUpOrder).subscribe((data) => {
      this.snackbar.openScakBar('Congrats!!You have ordered Successfully!!', 'success')

    })
    this.route.navigate([`viewallcakes`])
    // this.route.navigate([`OrderSummaryComponent/${this.id}`])
   
  }

  userData() {
      // Fetch the user details and pre-fill both online and offline order forms
      this.userService.checkIfUserExit(this.loginservice.userEmail).subscribe((data) => {
        this.user = data[0];
        // Pre-fill both forms
        this.userDataForOnline.firstName = this.user.firstName;
        this.userDataForOnline.lastName = this.user.lastName;
        this.userDataForOnline.phone = this.user.phone;
        this.userDataForOnline.city=this.user.address?.city,

        this.userDataForOnline.street=this.user.address?.street,
      
      this.userDataForOnline.state=this.user.address?.state,
      this.userDataForOnline.zipCode=this.user.address?.zipCode,
    
        this.userDataForOffline.firstName = this.user.firstName;
        this.userDataForOffline.lastName = this.user.lastName;
        this.userDataForOffline.phone = this.user.phone;
      });
}}