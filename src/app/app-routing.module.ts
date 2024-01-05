import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index/index-page/index-page.component';
import { UserDetailsPageComponent } from './user-details/user-details-page/user-details-page.component';

const routes: Routes = [
  {
    path: "profile",
    component: UserDetailsPageComponent
  },
  {
    path: "",
    component: IndexPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
