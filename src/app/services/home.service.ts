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

  public loadAllRequests(){
    return this._httpService.get(baseUrl+'admin/callRequests/');
  }

  public loadAllEnquiries(){
    return this._httpService.get(baseUrl+'admin/stay-form/');
  }

  public sendCallRequest(data:any){
    return this._httpService.post(baseUrl+'admin/sendRequest/',data);
  }
  public updateCallStatus(data:any){
    return this._httpService.put(baseUrl+'admin/updateRequest/',data);
  }

  public deleteCallStatus(requestId:any){
    return this._httpService.delete(baseUrl+'admin/deleteRequest/'+requestId);
  }
  
  public deleteEnquiry(enquiryId:any){
    return this._httpService.delete(baseUrl+'admin/deleteEnquiry/'+enquiryId);
  }

  public login(user:any){
    return this._httpService.post(baseUrl+'login/',user);
  }
  public loadAllBookings(){
    return this._httpService.get(baseUrl+'booking/getAllBookings/');
  }
  public updateBooking(bookingData:any){
    return this._httpService.post(baseUrl+'booking/updateBooking/',bookingData);
  }
}
