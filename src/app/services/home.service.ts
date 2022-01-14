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
}
