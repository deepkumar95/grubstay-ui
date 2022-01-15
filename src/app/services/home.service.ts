import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper/url.service'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _httpService:HttpClient) { }

  public loadNearByLocations(){
    return this._httpService.get(baseUrl+'landmark/');
  }

  public loadAllCounts(){
    return this._httpService.get(baseUrl+'admin/');
  }

  public login(user:any){
    return this._httpService.post(baseUrl+'login/',user);
  }
}
