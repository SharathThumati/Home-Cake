import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Add this import statement
import { cake } from '../model/cake';
import { ActivatedRoute, Router } from '@angular/router';
import { CakeService } from '../services/cake.service';

import { LoginService } from '../services/login.service';

import { OrderService } from '../services/order.service';
import { SnackbarService } from '../services/snackbar.service';
import { Order } from '../model/order';


@Component({
  selector: 'app-view-one-cake',
  templateUrl: './view-one-cake.component.html',
  styleUrls: ['./view-one-cake.component.css']
})
export class ViewOneCakeComponent implements OnInit {
  mycake: cake = {};
  id: any | null;


  constructor(
    private rs: ActivatedRoute,
    private cakeserve: CakeService,
    private route: Router,
    private snackbar: SnackbarService,

    public loginservice: LoginService,
    private orderservice: OrderService,

  ) { }

  ngOnInit(): void {
    this.rs.paramMap.subscribe(params => {
      let stdid = params.get('id') ?? 0;
      this.id = stdid;
      this.getOneCake(stdid);
    });
  }
 

  getOneCake(id: any) {
    this.cakeserve.getcakeById(id).subscribe((data) => {
      this.mycake = data;
    });
  }
 

  editCake() {
    this.route.navigateByUrl('editDetails/' + this.id);
  }

  deleteCake() {
    this.cakeserve.deleteCake(this.id).subscribe((data) => {
      this.route.navigateByUrl('viewallcakes');
      this.snackbar.openScakBar('Item Deleted', 'Successfully')
    });
  }


  order() {
    //  this.orderservice.submitOrder(this.orderData).subscribe((data) => {
    //   this.snackbar.openScakBar('Congrats!!You have ordered Successfully!!', 'success')
    //   console.log(data);
    // });
    this.route.navigate([`OrderComponent/${this.id}`])
  };
  

}

