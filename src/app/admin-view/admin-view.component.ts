import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.css'
})
export class AdminViewComponent implements OnInit {

  myorder:Order[]=[]

  constructor(private orderservice:OrderService){}
  ngOnInit(): void {
   this.orderservice. getAllOrderReqeusts().subscribe((data)=>{
    this.myorder=data
   });
  }

}