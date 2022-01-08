import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper/url.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private _http:HttpClient) { }

  public createUser(user){
    return this._http.post(baseUrl+"user/",user);
  }

  public checkUser(username){
    return this._http.get(baseUrl+"user/checkUser/"+username);
  }
}
