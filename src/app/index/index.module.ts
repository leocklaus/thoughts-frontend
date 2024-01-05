import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThoughtFormComponent } from './thought-form/thought-form.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ThoughtFormComponent,
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    IndexPageComponent
  ]
})
export class IndexModule { }
