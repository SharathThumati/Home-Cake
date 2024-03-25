import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { cake } from '../model/cake';
import { CakeService } from '../services/cake.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cakeview',
  templateUrl: './cakeview.component.html',
  styleUrls: ['./cakeview.component.css']
})
export class CakeviewComponent implements OnInit {
  cakesdata: cake[] = [];
  searchText: string = '';

  constructor(private cakeserv: CakeService, public loginservice: LoginService) { }

  ngOnInit(): void {
    this.getAll()
  }
  getAll() {
    this.cakeserv.getAll().subscribe(
      (allcakes) => { this.cakesdata = allcakes })
  }

  searchTitle($event: string) {
    this.cakeserv.getAll().subscribe({
      next: data => {
        if ($event == '' || !$event) {
          this.cakesdata = data;
        }
        else {
          this.cakesdata = data;
          this.cakesdata = this.cakesdata.filter((item) => {
            const titleCaps = item.name?.toUpperCase();
            const eventCaps = $event.toUpperCase();
            return titleCaps?.startsWith(eventCaps);

          })
        }
      },
      error: error => {
        alert("Failed to Fetch Notes Due to Server Error !!");
      }
    });
  };
}