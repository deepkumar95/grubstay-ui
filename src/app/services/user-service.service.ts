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

  public createAdmin(user){
    return this._http.post(baseUrl+"admin/",user);
  }

  public updateAdmin(user){
    return this._http.put(baseUrl+"admin/",user);
  }

  public deleteAdmin(userId){
    return this._http.delete(baseUrl+"admin/"+userId);
  }

  public checkUser(username){
    return this._http.get(baseUrl+"user/checkUser/"+username);
  }
  public loadAllAdmin(){
    return this._http.get(baseUrl+"admin/all");
  }
  
  public registerStayForm(stayForm:any){
    return this._http.post(baseUrl+"user/stay-form",stayForm);
  }
}
