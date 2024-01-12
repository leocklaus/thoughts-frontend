import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { ThoughtDetailsComponent } from './thought-details/thought-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ThoughtDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    SharedModule,
    UserDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
