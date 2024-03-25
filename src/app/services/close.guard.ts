import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';

import { Observable } from 'rxjs';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { AddcakeComponent } from '../addcake/addcake.component';


@Injectable({providedIn:'root'})
export class ClosingGuard implements CanDeactivate<RegisterFormComponent>{
  canDeactivate(
    component: RegisterFormComponent,
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
    return component.canClose? component.canClose():true;
  }
}

@Injectable({providedIn:'root'})
export class ClosingGuard2 implements CanDeactivate<AddcakeComponent>{
  canDeactivate(component: AddcakeComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose? component.canClose():true;
  }
  
  }
  
  
   


