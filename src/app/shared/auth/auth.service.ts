import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { loginData, loginOutput, userRegister } from 'src/app/models/authModels';
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

  getToken(){
    return window.localStorage.getItem("token");
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

  handleLogin(data: loginOutput){
    let token = data.token;
    let { exp } = jwtDecode(token);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("expDate", `${exp}`);
  }

  logout(){
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expDate");
  }

}
