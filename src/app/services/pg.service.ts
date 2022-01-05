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
  
  public getGalleryByPgId(pgId){
    return this._http.get(this.pgBaseUrl+"pgGallery/"+pgId);
  }

  public updatePgData(data){
    return this._http.put(this.pgBaseUrl,data);
  }
}
