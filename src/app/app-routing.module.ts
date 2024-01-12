import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index/index-page/index-page.component';
import { UserDetailsPageComponent } from './user-details/user-details-page/user-details-page.component';
import { ThoughtDetailsComponent } from './thought-details/thought-details.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: "home",
    component: IndexPageComponent
  },
  {
    path: "profile",
    component: UserDetailsPageComponent,
    pathMatch: 'full'
  },
  {
    path: "",
    children: [{
      path: ":user",
      component: UserDetailsPageComponent
    }]
  },
  {
    path: "",
    children: [{
      path: ":user/thought/:thoughtid",
      component: ThoughtDetailsComponent,
      pathMatch: 'full'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
