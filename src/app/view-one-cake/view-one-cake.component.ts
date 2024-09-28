import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Add this import statement
import { cake } from '../model/cake';
import { ActivatedRoute, Router } from '@angular/router';
import { CakeService } from '../services/cake.service';

import { LoginService } from '../services/login.service';

import { OrderService } from '../services/order.service';
import { SnackbarService } from '../services/snackbar.service';
import { Order } from '../model/order';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-view-one-cake',
  templateUrl: './view-one-cake.component.html',
  styleUrls: ['./view-one-cake.component.css']
})
export class ViewOneCakeComponent implements OnInit {
  mycake: cake = {};
  id: any | null;

   mail:any;
  constructor(
    private rs: ActivatedRoute,
    private cakeserve: CakeService,
    private route: Router,
    private snackbar: SnackbarService,

    public loginservice: LoginService,
    private orderservice: OrderService,
    private cartService:CartService

  ) { }

  ngOnInit(): void {
    this.rs.paramMap.subscribe(params => {
      let stdid = params.get('id') ?? 0;
      this.id = stdid;
      this.getOneCake(stdid);
    });
    this.mail=this.loginservice.userEmail;
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
    if(confirm("Do you what to delete item")){
      this.cakeserve.deleteCake(this.id).subscribe((data) => {
        this.route.navigateByUrl('viewallcakes');
        this.snackbar.openScakBar('Item Deleted', 'Successfully')
      });
    }
   
  }


  order() {
    this.route.navigate([`OrderComponent/${this.id}`])
  };
  

  Cart(){
    this.cartService.addToCart({email: this.mail,...this.mycake}).subscribe((data)=>console.log(data));
    // console.log(this.cartService.getCartItems());
    this.snackbar.openScakBar('Added to Cart', 'Success');
  }
  
  goToCart() {
    this.route.navigate(['cart']);
  }
}

