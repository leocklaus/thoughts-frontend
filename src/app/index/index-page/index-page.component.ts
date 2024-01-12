import { Component, OnInit } from '@angular/core';
import { likeEvent } from 'src/app/models/likeEvent';
import { pagination } from 'src/app/models/responsePaged';
import { tab } from 'src/app/models/tab';
import { thought } from 'src/app/models/thought';
import { ThoughtServiceService } from 'src/app/shared/services/thought-service.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit{


  content!: thought[];
  page!: pagination;
  content_following!: thought[];
  page_following!: pagination;
  tabs:tab[] = [
    {
      id: 1,
      name: "Recentes"
    },
    {
      id: 2,
      name: "Seguindo"
    }
  ]
  activeTab:number = 1

  constructor(private thoughtService: ThoughtServiceService){

  }

  ngOnInit(){
    this.thoughtService.getAllThoughtsPaged()
      .subscribe(data => {
        this.content = data.content;
        this.page = {
          pageable: data.pageable,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          last: data.last,
          numberOfElements: data.numberOfElements,
          first: data.first,
          empty: data.empty
        }
      })
    this.thoughtService.getFollowingThoughts()
    .subscribe(data => {
      this.content_following = data.content;
      this.page_following = {
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

  handleLikeEvent($event: likeEvent) {
    console.log($event)
    for(let i = 0; i <= this.content.length; i++){
      if(this.content[i].uuid == $event.uuid){
        this.content[i].likedByUser = $event.likedByUser;
        $event.likedByUser ? this.content[i].likesCount++: this.content[i].likesCount--;
      }
    }
  }

  handlePostEvent($event: thought) {
    this.content.unshift($event);
    if(this.content.length > 20){
      this.content.pop();
    }
  }

  handleNewDataEvent($event: thought[]) {
    this.content = [...this.content, ...$event]
  }

  handleTabChange(tabId:number){
    this.activeTab = tabId;
    console.log("mudou")
  }

}
