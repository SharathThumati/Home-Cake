import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor() { }
  isAdminLoggedIn:boolean=false;
  isUserLoggedIn:boolean=false;
  isLoggedIn:boolean=false;
  userFirstName:string="";
  userLastName:string="";
  userEmail:string="";
  role:string="";
  logIn(data:any)
  {
    this.isLoggedIn=true;
    if(data[0].role=="user")
    {
      this.isUserLoggedIn=true;
    }
    else{
    this.isAdminLoggedIn=true;
    }
    
    this.role=data[0].role;
    this.userFirstName=data[0].firstName;
  this.userLastName=data[0].lastName;
this.userEmail=data[0].email

  }
  logOut(){
    this.isAdminLoggedIn=false;
  this.isUserLoggedIn=false;
  this.userFirstName="";
  this.userLastName="";
  this.userEmail="";
  this.role="";
  this.isLoggedIn=false;
  }

}
