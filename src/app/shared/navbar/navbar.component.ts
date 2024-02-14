import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

constructor(private authService:AuthService, private router:Router){}

handleLogout() {
  this.authService.logout();
  this.router.navigate(['/login'])
}

}
