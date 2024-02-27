import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { responsePage } from 'src/app/models/responsePaged';
import { userDetails, userResponse } from 'src/app/models/userDetails';
import { AuthService } from '../auth/auth.service';
import { editUser } from 'src/app/models/authModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  private readonly API = "http://localhost:8080/api/v1/users"

  httpPostOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + this.authService.getToken()})
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getToken()})
  }

  getUserPosts(){
    return this.http.get<responsePage>(this.API + "/current/thoughts", this.httpOptions)
    .pipe(
      take(1)
    )
  }

  getUserReplies(){
    return this.http.get<responsePage>(this.API + "/current/replies", this.httpOptions)
    .pipe(
      take(1)
    )
  }

  getLikedThoughts(){
    return this.http.get<responsePage>(this.API + "/current/likes", this.httpOptions)
    .pipe(
      take(1)
    )
  }

  getUserDetails(username: string){
    return this.http.get<userDetails>(this.API + `/${username}`, this.httpOptions)
    .pipe(
      take(1)
    )
  }

  searchUser(query: string){
    return this.http.get<userResponse>(this.API + "/search", {params: {
      query
    }}).pipe(
      take(1)
    )
  }

  editUser(data:editUser, username:string){
    let payload = JSON.stringify(data);

    return this.http.put<userDetails>(`${this.API}/${username}`, payload, this.httpPostOptions)
      .pipe(
        take(1)
      )
    ;
  }
}
