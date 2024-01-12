import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { responsePage } from 'src/app/models/responsePaged';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private readonly API = "http://localhost:8080/api/v1/users/current"

  getUserPosts(){
    return this.http.get<responsePage>(this.API + "/thoughts")
    .pipe(
      take(1)
    )
  }

  getUserReplies(){
    return this.http.get<responsePage>(this.API + "/replies")
    .pipe(
      take(1)
    )
  }

  getLikedThoughts(){
    return this.http.get<responsePage>(this.API + "/likes")
    .pipe(
      take(1)
    )
  }
}
