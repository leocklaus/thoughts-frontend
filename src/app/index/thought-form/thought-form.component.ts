import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { thought } from 'src/app/models/thought';
import { thoughtInput } from 'src/app/models/thoughtInput';
import { ThoughtServiceService } from 'src/app/shared/services/thought-service.service';

@Component({
  selector: 'app-thought-form',
  templateUrl: './thought-form.component.html',
  styleUrls: ['./thought-form.component.scss']
})
export class ThoughtFormComponent {

  @Output() postEvent = new EventEmitter<thought>();

  constructor(private thoughtService: ThoughtServiceService){}

  thoughtForm = new FormGroup({
    content: new FormControl("", [
      Validators.maxLength(180)
    ])
  })

  @Input() newThoughtType!: "ORIGINAL" | "REPLY";

  @Input() formTextHoler!: string;

  @Input() originalThoughtId!: string;

  onSubmit(){

    let thought:thoughtInput = {
      content: this.thoughtForm.value.content as string,
      type: this.newThoughtType
    }

    if(this.newThoughtType == 'REPLY'){
      thought = { 
        ...thought,
        originalThoughtUuid: this.originalThoughtId
      }
    }

    this.thoughtService.saveThought(JSON.stringify(thought))
    .subscribe({
      next: (body)=> this.postEvent.emit(body as thought), 
      error: (error)=> console.log(error.error)
    })

    this.thoughtForm.reset();

  }

  getContentSize(){
    return this.thoughtForm.value.content ? this.thoughtForm.value.content.length : 0
  }

  checkValid():boolean{
    return this.thoughtForm.invalid
  }

}
