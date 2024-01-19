import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { responsePage } from 'src/app/models/responsePaged';
import { userDetails, userResponse } from 'src/app/models/userDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly API = "http://localhost:8080/api/v1/users"

  getUserPosts(){
    return this.http.get<responsePage>(this.API + "/current/thoughts")
    .pipe(
      take(1)
    )
  }

  getUserReplies(){
    return this.http.get<responsePage>(this.API + "/current/replies")
    .pipe(
      take(1)
    )
  }

  getLikedThoughts(){
    return this.http.get<responsePage>(this.API + "/current/likes")
    .pipe(
      take(1)
    )
  }

  getUserDetails(username: string){
    return this.http.get<userDetails>(this.API + `/${username}`)
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
}
