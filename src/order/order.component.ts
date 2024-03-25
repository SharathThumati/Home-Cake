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
  id: any | null;

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
    })
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
      totalAmount: this.mycake.price,
      itemName: this.mycake.name,
      date: this.date,
      messageOnCake: this.messageOnCake,
      deliveryType: "Door-Delivery",
      quantity:1

    }
    this.orderservice.submitOrder(this.doorDeliveryOrder).subscribe((data) => {
      this.snackbar.openScakBar('Congrats!!You have ordered Successfully!!', 'success')

    })
   
    this.route.navigate([`OrderSummaryComponent/${this.id}`])
  }

  ordernow() {
    this.storePickUpOrder = {
      email: this.user.email,
      firstName: this.userDataForOffline.firstName,
      lastName: this.userDataForOffline.lastName,
      phone: this.userDataForOffline.phone,
      totalAmount: this.mycake.price,
      itemName: this.mycake.name,
      date: this.date,
      messageOnCake: this.messageOnCake,
      deliveryType: "Store-pickUp",
      quantity:1
      
    }
    this.orderservice.submitOrder(this.storePickUpOrder).subscribe((data) => {
      this.snackbar.openScakBar('Congrats!!You have ordered Successfully!!', 'success')

    })
    this.route.navigate([`OrderSummaryComponent/${this.id}`])
   
  }
}