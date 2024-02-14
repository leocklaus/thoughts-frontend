import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.getToken();

    console.log("chamou")

    if (token) {
      const authReq = req.clone({
          headers: req.headers.set("Authorization",
              "Bearer " + token)
      });

      return next.handle(authReq);
    }
    else {
        return next.handle(req);
    }

  }
}
