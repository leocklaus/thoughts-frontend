import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchpassword } from '../shared/validators/matchpassword.validator';
import { loginOutput, userRegister } from '../models/authModels';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private authService:AuthService, private router:Router){}

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    birthday: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    checkPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
    bio: new FormControl("", [Validators.required]),
  },{
    validators: matchpassword
  })

  checkInvalid():boolean {
    return this.registerForm.invalid
  }

  onSubmit(){

    if(this.checkInvalid()){
      return;
    }

    let data: userRegister = {
      username: this.registerForm.value.username as string,
      email: this.registerForm.value.email as string,
      firstName: this.registerForm.value.firstName as string,
      lastName: this.registerForm.value.lastName as string,
      birthday: this.registerForm.value.birthday as string,
      password: this.registerForm.value.password as string,
      bio: this.registerForm.value.bio as string
    }

    this.authService.register(data)
      .subscribe({
        next: (data) => this.handleRegisterSucces(data),
        error: (err) => console.error(err)
      });

  }

  handleRegisterSucces(data: loginOutput): void {
    this.authService.handleLogin(data);
    this.router.navigate(["/"]);
  }


}
  

