import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/login']);
};

export const loginRegisterGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated()
    ? inject(Router).createUrlTree(['/'])
    : true;
};
