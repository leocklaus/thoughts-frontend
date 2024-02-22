import { Component } from '@angular/core';
import { PhotoService } from '../shared/services/photo.service';
import { AuthService } from '../shared/auth/auth.service';
import { previousData } from '../models/authModels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  constructor(private photoService:PhotoService, private authService:AuthService, private route:Router){
    this.previousData = authService.getPreviousData();
  }

  previousData!:previousData;

  image: Blob | undefined = undefined;


  handleImageReady(image: Blob) {
    this.image = image;
  }

  canSubmit():boolean{
    return !!this.image
  }

  handleSubmit(){
    let formData = new FormData();

    if(this.image){
      formData.append("file", this.image);
    }

    this.photoService.postProfilePicture(formData, this.previousData.token, this.previousData.username)
    .subscribe(()=>{
      this.authService.handleLogin({token: this.previousData.token, username: this.previousData.username})
      this.route.navigate(["/"])

    })

  }

}
