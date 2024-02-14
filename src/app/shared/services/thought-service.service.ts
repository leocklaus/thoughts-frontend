import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { responsePage } from 'src/app/models/responsePaged';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThoughtServiceService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  private readonly API = "http://localhost:8080/api/v1/thoughts";
  private readonly API_USER = "http://localhost:8080/api/v1/users/current"

  httpPostOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  httpOptions = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.getToken()})
  }

  getAllThoughtsPaged(){
    return this.http.get<responsePage>(this.API)
    .pipe(
      take(1)
    )
  }

  getFollowingThoughts(){
    return this.http.get<responsePage>(this.API_USER + `/followingthoughts`)
    .pipe(
      take(1)
    )
  }

  getThoughtById(id: string){
    return this.http.get(this.API + `/${id}`)
    .pipe(
      take(1)
    )
  }

  getThoughtComments(id: string){
    return this.http.get<responsePage>(this.API + `/${id}/comments`)
  }

  searchThought(query: string){
    return this.http.get<responsePage>(this.API + "/search", {params: {
      query
    }}).pipe(
      take(1)
    )
  }

  getNextPage(pageNumber: number){
    return this.http.get<responsePage>(this.API + `?page=${pageNumber}`)
    .pipe(
      take(1)
    )
  }


  saveThought(body: String){
    return this.http.post(this.API, body, this.httpPostOptions)
    .pipe(
      take(1)
    )
  }

  addLike(uuid: string){
    return this.http.put(this.API + `/${uuid}/like`, {}, this.httpPostOptions)
    .pipe(
      take(1)
    )
  }

  removeLike(uuid: string){
    return this.http.delete(this.API + `/${uuid}/like`, this.httpPostOptions)
    .pipe(
      take(1)
    )
  }
}
