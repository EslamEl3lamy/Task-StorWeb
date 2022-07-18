import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable , BehaviorSubject} from 'rxjs';
import {userData} from './userData';
import {Router} from  '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject<any>(null);

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem('userData') != null){
       this.currentUser.next(JSON.parse(localStorage.getItem('userData') || '{}'));
      //  ( JSON.parse(localStorage.getItem('userData')))
    }
  }

  register (registerFormValue: any):Observable<any>{
    return this._HttpClient.post("https://test-api.storexweb.com/api/register", registerFormValue);
  }

  login(loginFormValue: any):Observable<any>{
    return this._HttpClient.post("https://test-api.storexweb.com/api/login", loginFormValue);
  }

  logOut(){
    this.currentUser.next(null);
    localStorage.removeItem('userData');
    this._Router.navigate(['/login']);
  }

  saveCurrentUser(name: any, email: any ,token: any){
    let user = new userData(name , email ,token);
    localStorage.setItem('userData',JSON.stringify(user));
    this.currentUser.next(user);
  }
}
// https://routeegypt.herokuapp.com/signup
// https://routeegypt.herokuapp.com/getAllUsers
