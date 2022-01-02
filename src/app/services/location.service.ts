import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../../app/services/helper/url.service'

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  public loadAllLocation(){
    return this.http.get(baseUrl+"location/");
  }

  public addLocation(data:any){
    return this.http.post(baseUrl+"location/",data);
  }

  public updateLocation(data:any){
    return this.http.put(baseUrl+"location/",data);
  }
  public deleteLocation(locationId){
    return this.http.delete(baseUrl+"location/"+locationId);
  }
}
