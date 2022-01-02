import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper/url.service';

@Injectable({
  providedIn: 'root'
})
export class SubLocationService {

  constructor(private http:HttpClient) { }

  public addSubLocation(data:any){
    return this.http.post(baseUrl+"sublocation/",data);
  }
  public loadAllSubLocation(){
    return this.http.get(baseUrl+"sublocation/");
  }
  public updateSubLocation(data:any){
    return this.http.put(baseUrl+"sublocation/",data);
  }
  public deleteSubLocation(subLocationId){
    return this.http.delete(baseUrl+"sublocation/"+subLocationId);
  }
}
