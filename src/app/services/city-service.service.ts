import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../../app/services/helper/url.service'

@Injectable({
  providedIn: 'root'
})
export class CityServiceService {

  constructor(private _http:HttpClient) { }

  public loadAllCity(){
    return this._http.get(baseUrl+"city/");
  }
}
