import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    UserDetailsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserDetailsPageComponent
  ]
})
export class UserDetailsModule { }
