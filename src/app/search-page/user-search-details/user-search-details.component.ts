import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { pagination } from 'src/app/models/responsePaged';
import { userDetails } from 'src/app/models/userDetails';

@Component({
  selector: 'app-user-search-details',
  templateUrl: './user-search-details.component.html',
  styleUrls: ['./user-search-details.component.scss']
})
export class UserSearchDetailsComponent {

  @Input() content!: userDetails[];
  @Input() page!: pagination;

  constructor(private router: Router){}

  checkNoThoughts():boolean{
    return this.page.empty;
  }

  checkLastPage():boolean{
    return this.page.last
  }

  getNextPage(){
    return this.page.pageable.pageNumber + 1;
  }

  stopPropagation(event: Event){
    event.stopPropagation();
  }

  openUserDetails(username: string) {
    this.router.navigate([`/${username}`])
  }

  getFullName(user: userDetails) {
    return user.firstName + " " + user.lastName;
  }

  handleNextPage(){
    
  }

}
