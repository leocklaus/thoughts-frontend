import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { thought } from 'src/app/models/thought';
import { ThoughtServiceService } from '../services/thought-service.service';
import { likeEvent } from 'src/app/models/likeEvent';
import { pagination } from 'src/app/models/responsePaged';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thoughts-display',
  templateUrl: './thoughts-display.component.html',
  styleUrls: ['./thoughts-display.component.scss']
})
export class ThoughtsDisplayComponent {


  navItems = [
    {
      name: "Recentes",
      link: "#"
    },
    {
      name: "Seguindo",
      link: "#"
    }
  ]

  @Input() content!: thought[];

  @Input() page!: pagination;

  @Output() toogleLikeEvent = new EventEmitter<likeEvent>();

  @Output() addNewData = new EventEmitter<thought[]>();

  constructor(private thoughtService: ThoughtServiceService, private router:Router){

  }


  toogleLike(uuid: string, likedByUser:boolean, event: Event){
    event.stopPropagation();
    if(likedByUser){
      return this.thoughtService.removeLike(uuid)
        .subscribe({
          complete: ()=> this.toogleLikeEvent.emit({uuid: uuid, likedByUser: false}),
        });
    }
    return this.thoughtService.addLike(uuid)
      .subscribe({
        complete: ()=> this.toogleLikeEvent.emit({uuid: uuid, likedByUser: true})
      });
  }

  checkNoThoughts():boolean{
    return this.page.empty;
  }

  checkLastPage():boolean{
    return this.page.last
  }

  getNextPage(){
    return this.page.pageable.pageNumber + 1;
  }

  handleNextPage(){
    console.log("chamou")
    return this.thoughtService.getNextPage(this.getNextPage())
    .subscribe({
      next: (data) => {
        this.addNewData.emit(data.content as thought[])
        this.page = {
          pageable: data.pageable,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          last: data.last,
          numberOfElements: data.numberOfElements,
          first: data.first,
          empty: data.empty
        }
      }
    });
  }

  openThoughtDetails(thoughtId: string, username: string) {
      this.router.navigate([`/${username}/thought/${thoughtId}`])
    }

    gerProfilePicture(username: String) {
      return `http://localhost:8080/api/v1/users/pictures/${username}/profile`
    }

  stopPropagation(event: Event){
    event.stopPropagation();
  }

}
