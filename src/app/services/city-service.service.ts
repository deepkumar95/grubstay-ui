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

  public addCity(data:any){
    return this._http.post(baseUrl+"city/",data);
  }
}
