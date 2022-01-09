import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '././helper/url.service'

@Injectable({
  providedIn: 'root'
})
export class LandMarkService {

  constructor(private httpClient:HttpClient) { }

  public loadAllLandMarks(){
    return this.httpClient.get(baseUrl+"landmark/");
  }

  public addLandMark(data){
    return this.httpClient.post(baseUrl+"landmark/",data);
  }

  public deleteLandMark(landMarkId){
    return this.httpClient.delete(baseUrl+"landmark/"+landMarkId);
  }

  public updateLandMark(data:any){
    return this.httpClient.put(baseUrl+"landmark/", data);
  }
}
