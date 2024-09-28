import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  url: string = "http://localhost:3000/users"

  addUser(event:User){
    return this.httpClient.post<User>("http://localhost:3000/users",event);
  }
  checkIfUserExit(email:any){
    return this.httpClient.get<User[]>("http://localhost:3000/users?email="+email)
  }
 
  checkUsernameAndPassword(email:String,password:String){
  
    return this.httpClient.get<User[]>("http://localhost:3000/users?email="+email+"&password="+password);
  }
  getUserByEmail(email:any){
    return this.httpClient.get<User>("http://localhost:3000/users?email="+email)
  }
}


 

