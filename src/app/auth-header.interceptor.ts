import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private _AuthService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = '';
    let user = this._AuthService.currentUser.getValue();
    token = user?.token || '';

    console.log('user', user);
    console.log('token', token);

    const headers = request.headers.set('Authorization', `Bearer ${token}`);
    return next.handle(request.clone({ headers }));

    // if (token != null) {
    //   request.headers.append('Authorization', `Bearer ${token}`);
    // }

    // return next.handle(request);
  }
}
