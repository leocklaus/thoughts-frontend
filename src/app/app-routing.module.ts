import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index/index-page/index-page.component';
import { UserDetailsPageComponent } from './user-details/user-details-page/user-details-page.component';
import { ThoughtDetailsComponent } from './thought-details/thought-details.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard, loginRegisterGuard, loginWelcomeGuard } from './shared/auth/auth.guard';
import { RegisterPageComponent } from './register-page/register-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserDetailsEditPageComponent } from './user-details/user-details-edit-page/user-details-edit-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full',

  },
  {
    path: "home",
    component: IndexPageComponent,
    canActivate: [authGuard]
  },
  {
    path: "profile",
    component: UserDetailsPageComponent,
    pathMatch: 'full'
  },
  {
    path: "search",
    component: SearchPageComponent,
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginPageComponent,
    canActivate: [loginRegisterGuard]
  },
  {
    path: "register",
    component: RegisterPageComponent,
    canActivate: [loginRegisterGuard]
  },
  {
    path: "welcome",
    component: WelcomePageComponent,
    canActivate: [loginRegisterGuard, loginWelcomeGuard]
  },
  {
    path: "",
    canActivate: [authGuard],
    children: [{
      path: ":user",
      component: UserDetailsPageComponent
    }]
  },
  {
    path: "",
    children: [{
      path: ":user/edit",
      component: UserDetailsEditPageComponent,
      pathMatch: 'full'
    }]
  },
  {
    path: "",
    children: [{
      path: ":user/thought/:thoughtid",
      component: ThoughtDetailsComponent,
      pathMatch: 'full'
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
