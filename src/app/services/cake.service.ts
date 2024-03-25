import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cake } from '../model/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  getOne(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpclient:HttpClient) {
  }
  addCake(bakeCake: cake)
  {
    
   return this.httpclient.post< cake>("http://localhost:3000/cakes",bakeCake);
  }
  editCake(bakeCake:cake,id:any)
  {
   return this.httpclient.put<cake>("http://localhost:3000/cakes/"+id,bakeCake);
  }
  deleteCake(id:number)
  {
   return this.httpclient.delete<cake>("http://localhost:3000/cakes/"+id);
  }
  getAll()
  {
    return this.httpclient.get<cake[]>("http://localhost:3000/cakes");
  }
  getcakesByName(name:string)
  {
    return this.httpclient.get<cake[]>(" http://localhost:3000/cakes?name="+name);
  }
  getcakeById(id:number)
  {
    return this.httpclient.get<cake>("http://localhost:3000/cakes/"+id);
  }
}
