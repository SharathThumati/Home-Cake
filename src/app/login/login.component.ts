import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginForm!: FormGroup;
  email: string = "";
  password: string = "";
  hide: boolean = true;
  constructor(private userserve: UserService, private router: Router, private snackBar: SnackbarService, private loginservice: LoginService) { }

  ngOnInit(): void { }

  login() {

    this.userserve.checkUsernameAndPassword(this.email, this.password).subscribe((data) => {
      if (data.length == 1) {
        this.loginservice.logIn(data);
        this.snackBar.openScakBar('login ', 'success!!');
        this.router.navigateByUrl("viewallcakes");
      }
      else {
        this.userserve.checkIfUserExit(this.email).subscribe((data) => {
          if (data.length == 1) {
            this.snackBar.openScakBar(' Your password incorrect!!', 'failed')
          }
          else {
            this.snackBar.openScakBar(' Your are not Registered !!', 'Registere now')
          }
        }
        )
      }
    })
  };
  registerForm() {
    this.router.navigateByUrl("registerForm")
  }


}
