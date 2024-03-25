import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {
  constructor(private orderservice: OrderService, private loginservice: LoginService, private router: Router) { }
  orderdata: Order[] = []

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderservice.getOrderDetails(this.loginservice.userEmail).subscribe((data) => {
      this.orderdata = data;
      console.log(data);
    })
  };
  backtoHome(){
    this.router.navigateByUrl("viewallcakes")
  }

}
