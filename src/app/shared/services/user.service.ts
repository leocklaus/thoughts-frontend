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

  getUserPosts(username: string){
    return this.http.get<responsePage>(this.API + "/" + username + '/thoughts', this.httpOptions)
    .pipe(
      take(1)
    )
  }

  getUserReplies(username: string){
    return this.http.get<responsePage>(this.API + "/" + username + "/replies", this.httpOptions)
    .pipe(
      take(1)
    )
  }

  getLikedThoughts(username:string){
    return this.http.get<responsePage>(this.API + "/" + username + "/likes", this.httpOptions)
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

  followUser(uuid:string){
    return this.http.put<void>(this.API + `/follow/${uuid}`, this.httpPostOptions)
    .pipe(
      take(1)
    )
  }

  unfollowUser(uuid:string){
    return this.http.delete<void>(this.API + `/follow/${uuid}`, this.httpPostOptions)
    .pipe(
      take(1)
    )
  }
}
