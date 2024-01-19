import { Component, OnInit } from '@angular/core';
import { tab } from '../models/tab';
import { thought } from '../models/thought';
import { pagination } from '../models/responsePaged';
import { ThoughtServiceService } from '../shared/services/thought-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { userDetails } from '../models/userDetails';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  queryValue!: string;
  thoughtsContent!: thought[];
  thoughtsPage!: pagination;
  usersContent!: userDetails[];
  usersPage!: pagination;

  searchForm = new FormGroup({
    search: new FormControl()
  })

  tabs:tab[] = [
    {
      id: 1,
      name: "Thoughts"
    },
    {
      id: 2,
      name: "Usuários"
    },
  ]
  activeTab:number = 1

  constructor(private thoughtService:ThoughtServiceService, 
    private route: ActivatedRoute, private router: Router,
    private userService:UserService){
    this.route.queryParams.subscribe(params => {
      console.log("mudou")
      this.ngOnInit()});
  }

  ngOnInit() {
   this.route.queryParams.subscribe(
      params => {
        this.searchForm.controls['search'].setValue(params['q'])}
    );
    this.thoughtService.searchThought(this.searchForm.value.search).subscribe(
      data => {
        this.thoughtsContent = data.content;
        this.thoughtsPage = {
          pageable: data.pageable,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          last: data.last,
          numberOfElements: data.numberOfElements,
          first: data.first,
          empty: data.empty
        }
      }
    )
    this.userService.searchUser(this.searchForm.value.search).subscribe(
      data => {
        this.usersContent = data.content;
        this.usersPage = {
          pageable: data.pageable,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          last: data.last,
          numberOfElements: data.numberOfElements,
          first: data.first,
          empty: data.empty
        }
      }
    )

  }

  handleTabChange(tabId:number){
    this.activeTab = tabId;
  }

  submit(){
    console.log("chanou")
    this.router.navigate(["search"], {queryParams: {q: this.searchForm.value.search}})
  }

}
