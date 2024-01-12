import { Component, OnInit } from '@angular/core';
import { pagination } from 'src/app/models/responsePaged';
import { tab } from 'src/app/models/tab';
import { thought } from 'src/app/models/thought';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit{

  postsContent!: thought[];
  postsPagination!: pagination;
  commentsContent!: thought[];
  commentsPagination!: pagination;
  likesContent!: thought[];
  likesPagination!: pagination;

  constructor(private service: UserService){}

  tabs:tab[] = [
    {
      id: 1,
      name: "Posts"
    },
    {
      id: 2,
      name: "Respostas"
    },
    {
      id: 3,
      name: "Curtidas"
    }
  ]
  activeTab:number = 1

  ngOnInit() {
    this.service.getUserPosts()
    .subscribe(data => {
      this.postsContent = data.content;
      this.postsPagination = {
        pageable: data.pageable,
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        last: data.last,
        numberOfElements: data.numberOfElements,
        first: data.first,
        empty: data.empty
      }
    })
    this.service.getUserReplies()
    .subscribe(data => {
      this.commentsContent = data.content;
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
    this.service.getLikedThoughts()
    .subscribe(data => {
      this.likesContent = data.content;
      this.likesPagination = {
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


  handleTabChange(tabId:number){
    this.activeTab = tabId;
  }

}
