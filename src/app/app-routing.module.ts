import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CakeviewComponent } from './cakeview/cakeview.component';
import { AddcakeComponent } from './addcake/addcake.component';
import { ViewOneCakeComponent } from './view-one-cake/view-one-cake.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AdminGuard } from './services/admin.guard';
import { ClosingGuard, ClosingGuard2 } from './services/close.guard';


import { OrderComponent } from './order/order.component';
import { UserGuard } from './services/user.guard';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartComponent } from './cart/cart.component';
import { AdminViewComponent } from './admin-view/admin-view.component';


const routes: Routes = [
  {
    path:"",
    component:CakeviewComponent
  },
  {
    path:"addCake",
    component:AddcakeComponent,
    canActivate:[AdminGuard],
    canDeactivate:[ClosingGuard]
  },
  {
    path:"cakeview",
    component:AddcakeComponent
    
  },
  {
    path:"adminView",
    component:AdminViewComponent
    
  },
  {
    path:"viewallcakes",
    redirectTo:""
  },
  {
    path:"cart", 
    component:CartComponent
  },
  {
    path:"viewDetails/:id", 
    component:ViewOneCakeComponent
  },
  {
    path:"editDetails/:id", 
    component:AddcakeComponent,
    canActivate:[AdminGuard],
    canDeactivate:[ClosingGuard2]
  },
  {
    path:"login", 
    component:LoginComponent
  },

  {
    path:"registerForm",
    component:RegisterFormComponent,
    canDeactivate:[ClosingGuard]
  },
  {
    path:"OrderComponent/:id", 
    component:OrderComponent,
    canActivate:[UserGuard],
  },
  {
    path:"OrderSummaryComponent/:id", 
    component:OrderSummaryComponent,
    canActivate:[UserGuard],
  },
  {
    path:"**",//matches anything
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
