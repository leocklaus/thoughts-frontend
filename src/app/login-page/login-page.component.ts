import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginData, loginOutput } from '../models/authModels';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void {
    this.authService.clearAuthLocalStorage();
  }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  })


  onSubmit(){

    let loginData: loginData = {
      login: this.loginForm.value.username as string,
      password: this.loginForm.value.password as string,
    }

    this.authService.login(loginData)
      .subscribe({
        next: (data) => this.handleLoginSuccess(data),
        error: (data)=> this.handleLoginError(),
      }
      )
  }

  checkInvalid():boolean {
    return this.loginForm.invalid;
    }
  
  handleLoginSuccess(data: loginOutput){
    this.authService.handleLogin(data);
    this.router.navigate(["/"])
  }

  handleLoginError(){
    console.log("erro")
  }
}
