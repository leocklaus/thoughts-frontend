import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThoughtFormComponent } from './thought-form/thought-form.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ThoughtsDisplayComponent } from '../shared/thoughts-display/thoughts-display.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ThoughtFormComponent,
    IndexPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    IndexPageComponent,
    ThoughtFormComponent
  ]
})
export class IndexModule { }
