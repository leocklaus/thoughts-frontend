import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsEditPageComponent } from './user-details-edit-page/user-details-edit-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDetailsPageComponent,
    UserDetailsEditPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    UserDetailsPageComponent
  ]
})
export class UserDetailsModule { }
