import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http:HttpClient) { }

  private readonly API = "http://localhost:8080/api/v1/users/pictures/"

  postProfilePicture(form: FormData, token: String, username: String){

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data' ,'Authorization': 'Bearer ' + token});

    return this.http.put(this.API + username + "/profile", form, {headers: headers})
    .pipe(
      take(1)
    );
  }

  postProfilePictureLogged(form: FormData, username: String){

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data'});

    return this.http.put(this.API + username + "/profile", form, {headers: headers})
    .pipe(
      take(1)
    );
  }

  postCoverPictureLogged(form: FormData, username: String){

    const headers = new HttpHeaders({ 'enctype': 'multipart/form-data'});

    return this.http.put(this.API + username + "/cover", form, {headers: headers})
    .pipe(
      take(1)
    );
  }
}
