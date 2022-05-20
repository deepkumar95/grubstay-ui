import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper/url.service'

@Injectable({
  providedIn: 'root'
})
export class PgService {

  pgBaseUrl = baseUrl+"pg/";

  constructor(private _http:HttpClient) { }

  public getPGData(obj:any){
    return this._http.post(this.pgBaseUrl, obj, {});
  }

  public savePgData(data){
    return this._http.post(this.pgBaseUrl,data);
  }

  public loadAllPGData(){
    return this._http.get(this.pgBaseUrl);
  }
  
  public getGalleryByPgId(data){
    return this._http.post(this.pgBaseUrl+"pgGallery/"+data.pgName, data);
  }

  public getGalleryByPgId2(pgId:any){
    return this._http.get(this.pgBaseUrl+"pgGallery/"+pgId);
  }

  public updatePgData(data){
    return this._http.put(this.pgBaseUrl,data);
  }

  public deletePgData(pgId){
    return this._http.delete(this.pgBaseUrl+pgId);
  }
  public getPGDataWithFilter(data:any){
    return this._http.post(this.pgBaseUrl+"pgfilterData", data);
  }
  public loadPgData(data){
    return this._http.post(this.pgBaseUrl+data.pgName,data);
  }
  public loadLandMark(data){
    return this._http.post(this.pgBaseUrl+"landmarks/"+data.pgName, data);
  }
  public loadAllPGDataInCity(cityName){
    return this._http.get(this.pgBaseUrl+"loadAllPG/"+cityName);
  }

  public getPgUsingSubLocationLocationAndCity(data:any){
    return this._http.get(this.pgBaseUrl+"getPgUsingSubLocationLocationAndCity/"+data.cityName+"/"+data.locationName+"/"+data.subLocationName);
  }

  public reservePgNow(data:any){
    return this._http.post(this.pgBaseUrl+"reservePg", data);
  }
}
