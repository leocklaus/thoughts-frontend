import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { ThoughtDetailsComponent } from './thought-details/thought-details.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchDetailsComponent } from './search-page/user-search-details/user-search-details.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './shared/auth/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ThoughtDetailsComponent,
    SearchPageComponent,
    UserSearchDetailsComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    SharedModule,
    UserDetailsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
