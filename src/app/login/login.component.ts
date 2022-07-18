import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _Router:Router , private _AuthService:AuthService) { }
  loginForm: any;
  flag:boolean = false;
  errorMessage: any;


  getLoginInfo(loginForm: any){
    if(loginForm.valid == true){
      this._AuthService.login(loginForm.value).subscribe((data)=>{
        if(data.status == 'success'){
          this._AuthService.saveCurrentUser('data.user.name' , 'data.user.email' , data.authorisation.token);
          this._Router.navigate(['../home']);
        }
        else{
          this.flag = true;
          this.errorMessage = data.message;
        }
      });
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email':new FormControl(null,[Validators.required, Validators.email]),
      'password': new FormControl(null,[Validators.pattern(/^[A-Z]/),Validators.required])
    });
  }
}
