import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { likeEvent } from 'src/app/models/likeEvent';
import { pagination } from 'src/app/models/responsePaged';
import { tab } from 'src/app/models/tab';
import { thought } from 'src/app/models/thought';
import { userDetails } from 'src/app/models/userDetails';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit{

  
  
  getCoverPicture() {
    return `http://localhost:8080/api/v1/users/pictures/${this.username}/cover`
  }
  
  getProfilePicture(username: string) {
    return `http://localhost:8080/api/v1/users/pictures/${username}/profile`
  }
  
  postsContent!: thought[];
  postsPagination!: pagination;
  commentsContent!: thought[];
  commentsPagination!: pagination;
  likesContent!: thought[];
  likesPagination!: pagination;
  userDetails!: userDetails;
  username!: string;
  
  constructor(private service: UserService, private route: ActivatedRoute, private router: Router){
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    })
  }
  
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
    this.username = this.route.snapshot.paramMap.get('user') as string;
    this.service.getUserDetails(this.username)
    .subscribe(data => {
      this.userDetails = data
    })
    this.service.getUserPosts(this.username)
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
    this.service.getUserReplies(this.username)
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
    this.service.getLikedThoughts(this.username)
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

  handleLikeEvent($event: likeEvent, data:thought[]) {
    for(let i = 0; i <= data.length; i++){
      if(data[i].uuid == $event.uuid){
        data[i].likedByUser = $event.likedByUser;
        if($event.likedByUser){
          data[i].likesCount++;
        }else{
          data[i].likesCount--;
        }  
      }
    }
  }

  handleFollow(){
    this.service.followUser(this.userDetails.uuid)
    .subscribe(()=>{
      this.userDetails.followedByLoggedUser = true;
      this.userDetails.followers++;
    });
  }

  handleUnfollow(){
    this.service.unfollowUser(this.userDetails.uuid)
    .subscribe(()=>{
      this.userDetails.followedByLoggedUser = false;
      this.userDetails.followers--;
    });
  }
  
  getPostsQtyFormated(){
    let postsQty = this.userDetails.postsCount;
    let sufix = postsQty == 1 ? 'thought' : 'thoughts';
    return postsQty + ` ${sufix}`
  }
  
  getFullName(){
    return this.userDetails.firstName + " " + this.userDetails.lastName;
  }
  
  handleEditProfile() {
    this.router.navigate([`/${this.username}/edit`])
  }

}
