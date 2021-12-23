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
}
