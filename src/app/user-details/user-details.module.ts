import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';



@NgModule({
  declarations: [
    UserDetailsPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserDetailsPageComponent
  ]
})
export class UserDetailsModule { }
