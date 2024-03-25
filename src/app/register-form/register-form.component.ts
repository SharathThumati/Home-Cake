import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../app/model/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private snackBar: SnackbarService, private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  // users:User={}

  passwordPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2),Validators.pattern((/^[a-zA-Z]+$/))]],
    lastName: ['',Validators.pattern((/^[a-zA-Z]+$/))],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    role: ['user'],
    gender: ['',Validators.required],
    age: [0, [Validators.required,Validators.min(1),Validators.pattern(/^[0-9]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
    phone: ['', [Validators.pattern('[987][0-9]{9}')]],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zipCode: ['', [Validators.pattern(/^\d{5,6}$/)]]
    })
  }, { validators: this.passwordCheck })

  passwordCheck(ac: AbstractControl) {
    let pass = ac.get('password')?.value;
    let conpass = ac.get('confirmPassword')?.value;

    if (pass === conpass) {
      return null;
    }
    else {
      return { passwordMismatch: true };
    }
  }

  get firstName() {
    return this.registerForm.get("firstName");
  }
  get lastName() {
    return this.registerForm.get("lastName");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
  get gender() {
    return this.registerForm.get("gender");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get phone() {
    return this.registerForm.get("phone");
  }
  get street() {
    return this.registerForm.get("address.street");
  }
  get city() {
    return this.registerForm.get("address.city");
  }
  get state() {
    return this.registerForm.get("address.state");
  }
  get zipCode() {
    return this.registerForm.get("address.zipCode");
  }

  saveUser() {
    this.userservice.checkIfUserExit(this.registerForm.get('email')?.value).subscribe((data) => {
      this.validateData(data)
    })
  }
  validateData(data: any) {
    if (data.length != 0) {
      this.snackBar.openScakBar(' Your emailId already exited!!', 'failed')
    }
    else {
      this.userservice.addUser(this.registerForm.value as User).subscribe(
        success => {
          this.snackBar.openScakBar('Congrats!! You have submitted the form!!', 'success')
          this.router.navigateByUrl("login")
        },
        failure => {
          alert(failure);
        }
      );
    }
  };
  login() {
    this.router.navigateByUrl("login")
  };

  canClose() {
    if (this.registerForm.dirty && this.registerForm.invalid) {
      let response = confirm("Do you want to leave in between!!")
      return response;
    }
    else {
      return true;
    }
  }

}



