import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { loginData, loginOutput, previousData, userRegister } from 'src/app/models/authModels';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly API = "http://localhost:8080/api/v1";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  isAuthenticated(){
    let token = this.getToken();

    return token && !this.isExpired() ? true: false;
  }

  canWelcome():boolean{
    let prevToken = window.localStorage.getItem("prev_token");

    return prevToken? true:false;
  }

  getToken(){
    return window.localStorage.getItem("token");
  }

  getUsername(){
    return window.localStorage.getItem("username");
  }

  getPreviousData():previousData{
    return {
      token: window.localStorage.getItem("prev_token") as string,
      username: this.getUsername() as string
    }
  }

  isExpired(){
    let exp = Number(window.localStorage.getItem("expDate"));

    if(!exp){
      return true
    }

    if (Date.now() >= exp * 1000) {
      return true;
    }

    return false;
  }

  login(data: loginData){
    let payload = JSON.stringify(data);
    return this.http.post<loginOutput>(`${this.API}/auth/login`, payload, this.httpOptions)
      .pipe(
        take(1)
      )
  }

  register(data: userRegister) {

    let payload = JSON.stringify(data);

    return this.http.post<loginOutput>(`${this.API}/users`, payload, this.httpOptions)
      .pipe(
        take(1)
      )
    ;
  }

  handleRegister(data: loginOutput){
    let token = data.token;
    let { exp } = jwtDecode(token);
    window.localStorage.setItem("prev_token", token);
    window.localStorage.setItem("prev_expDate", `${exp}`);
    window.localStorage.setItem("username", data.username);
  }

  handleLogin(data: loginOutput){
    window.localStorage.removeItem("prev_token");
    window.localStorage.removeItem("prev_expDate");
    let token = data.token;
    let { exp } = jwtDecode(token);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("expDate", `${exp}`);
    window.localStorage.setItem("username", data.username);
  }

  logout(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expDate");
    window.localStorage.removeItem("username");
  }

}
