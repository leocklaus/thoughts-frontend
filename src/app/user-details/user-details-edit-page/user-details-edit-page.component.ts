import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { editUser } from 'src/app/models/authModels';
import { userDetails } from 'src/app/models/userDetails';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { ThoughtServiceService } from 'src/app/shared/services/thought-service.service';
import { UserService } from 'src/app/shared/services/user.service';
import { CropperDialogComponent, CropperDialogResult } from 'src/app/welcome-page/cropper-dialog/cropper-dialog.component';

@Component({
  selector: 'app-user-details-edit-page',
  templateUrl: './user-details-edit-page.component.html',
  styleUrls: ['./user-details-edit-page.component.scss']
})
export class UserDetailsEditPageComponent implements OnInit{

  userDetails!: userDetails;
  username!: string;

  

  constructor(private userService:UserService, 
    private route:ActivatedRoute, private photoService:PhotoService, private router:Router
    ){

  }

  editForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    birthDay: new FormControl("", [Validators.required]),
    bio: new FormControl("", [Validators.required])
  })

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('user') as string;
    console.log(this.username);
    this.userService.getUserDetails(this.username)
    .subscribe(data => {
      this.userDetails = data;
      this.editForm.patchValue({
        firstName: this.userDetails.firstName,
        lastName: this.userDetails.lastName,
        birthDay: this.userDetails.birthday,
        bio: this.userDetails.bio
      })
    })
  }

  getProfilePicture(username: string) {
    return `http://localhost:8080/api/v1/users/pictures/${username}/profile`
  }

  getCoverPicture(username: string) {
    return `http://localhost:8080/api/v1/users/pictures/${username}/cover`
  }

  imageSource = computed(() => {
    return this.croppedImage()?.imageUrl ?? this.getProfilePicture(this.username);
  });

  imageCoverSource = computed(() => {
    return this.croppedCoverImage()?.imageUrl ?? this.getCoverPicture(this.username);
  });

  getFullName(){
    return this.userDetails.firstName + " " + this.userDetails.lastName;
  }

  croppedImage = signal<CropperDialogResult | undefined>(undefined);

  croppedCoverImage = signal<CropperDialogResult | undefined>(undefined);

  dialog = inject(MatDialog);

  fileSelected(event: any) {


    const file = event.target?.files[0];
    if (file) {
      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: {
          image: file,
          width: 140,
          height: 140,
        },
        width: '500px',
      });

      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result: CropperDialogResult) => {
          this.croppedImage.set(result);
        });
    }
  }

  coverFileSelected(event: any) {


    const file = event.target?.files[0];
    if (file) {
      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: {
          image: file,
          width: 600,
          height: 200,
        },
        width: '600px',
      });

      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result: CropperDialogResult) => {
          this.croppedCoverImage.set(result);
        });
    }
  }

  handleSubmit(){

    if(this.croppedImage()){

      const formData = new FormData;

      formData.append("file", this.croppedImage()?.blob as Blob)

      this.photoService.postProfilePictureLogged(formData, this.username)
      .subscribe();

    }else if(this.croppedCoverImage()){
      const formData = new FormData;

      formData.append("file", this.croppedCoverImage()?.blob as Blob)

      this.photoService.postCoverPictureLogged(formData, this.username)
      .subscribe();
    }

      const form = this.editForm.value

      const data:editUser = {
        firstName: form.firstName as string,
        lastName: form.lastName as string,
        birthday: form.birthDay as string,
        bio: form.bio as string,
      }

      this.userService.editUser(data, this.username)
      .subscribe(()=>{
        this.router.navigate([`/${this.username}`])
      });
    
      

    

  }
    

}
