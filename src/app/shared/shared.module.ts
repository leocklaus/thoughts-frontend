import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { ThoughtsDisplayComponent } from './thoughts-display/thoughts-display.component'
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapChat, bootstrapChatFill, bootstrapHeart, bootstrapHeartFill, bootstrapArrowLeft, bootstrapSearch, bootstrapCamera } from '@ng-icons/bootstrap-icons';
import { LocalDateTimePipe } from './pipe/local-date-time.pipe';




@NgModule({
  declarations: [
    NavbarComponent,
    ThoughtsDisplayComponent,
    LocalDateTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule.withIcons({ bootstrapChat, bootstrapChatFill, bootstrapHeart, bootstrapHeartFill, bootstrapArrowLeft, bootstrapSearch, bootstrapCamera})
  ],
  exports: [
    NavbarComponent,
    ThoughtsDisplayComponent,
    NgIconsModule
  ],
  providers: [
    LocalDateTimePipe
  ]
})
export class SharedModule { }
