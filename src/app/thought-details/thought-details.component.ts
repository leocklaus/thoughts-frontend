import { Component, OnInit } from '@angular/core';
import { ThoughtServiceService } from '../shared/services/thought-service.service';
import { ActivatedRoute } from '@angular/router';
import { thought } from '../models/thought';
import { pagination } from '../models/responsePaged';
import { likeEvent } from '../models/likeEvent';

@Component({
  selector: 'app-thought-details',
  templateUrl: './thought-details.component.html',
  styleUrls: ['./thought-details.component.scss']
})
export class ThoughtDetailsComponent implements OnInit {
  
  getProfilePicture(username: String) {
    return `http://localhost:8080/api/v1/users/pictures/${username}/profile`
  }

  thoughtId!: string;
  thoughtData!: thought;
  thoughtComments!: thought[];
  commentsPagination!: pagination;

  constructor(private service: ThoughtServiceService, private route: ActivatedRoute){
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    })
  }
  
  ngOnInit() {
    this.thoughtId = this.route.snapshot.paramMap.get('thoughtid') as string;
    this.service.getThoughtById(this.thoughtId)
    .subscribe(data => this.thoughtData = data as thought);
    this.service.getThoughtComments(this.thoughtId)
    .subscribe(data => {
      this.thoughtComments = data.content;
      this.commentsPagination = {
        pageable: data.pageable,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        last: data.last,
        numberOfElements: data.numberOfElements,
        first: data.first,
        empty: data.empty
      }
    })
  }

  getFullName():string {
    return this.thoughtData.firstname + " " + this.thoughtData.lastname;
  }

  handlePostEvent($event: thought) {
    this.thoughtComments.unshift($event);
    if(this.thoughtComments.length > 20){
      this.thoughtComments.pop();
    }

    this.thoughtData.commentsCount++;

  }

  handleLikeEvent($event: likeEvent){
    for(let i = 0; i <= this.thoughtComments.length; i++){
      if(this.thoughtComments[i].uuid == $event.uuid){
        this.thoughtComments[i].likedByUser = $event.likedByUser;
        $event.likedByUser ? this.thoughtComments[i].likesCount++: this.thoughtComments[i].likesCount--;
      }
    }
  }

}
