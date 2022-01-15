import { T } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharedService } from './helper/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();
  constructor(private _shared:SharedService) { }
  
  public isLoggedIn(){
    let userStr = localStorage.getItem("user");
    if(userStr==undefined || userStr == '' || userStr == null){
      return false;
    }
    else{
      return true;
    }
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }
  //get user
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }
  // get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
  public logout(){
    localStorage.removeItem("user");
    this._shared.redirectTo('/');
    return true;
  }
}
