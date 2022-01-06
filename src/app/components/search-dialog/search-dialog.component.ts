import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/helper/shared.service';
import { LocationService } from '../../services/location.service';
import { CustomSnackBarService } from '../../services/helper/custom-snack-bar.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

export interface Data {
  city:string,
  location:string,
  citypic:string
}

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  searchResult:Data[]=[];  
  totalData:Data[]=[];
  public sanitizer;

  itemSelected:boolean = false;
  stayTypes:any = ['Paying Guest','Flats','Rooms','Weekend Stay']

  search = {
    name : '',
    stayType:'',
    gender:'',
    nearby:'',
    stayPlan:''
  }
  // searchResult = [
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
  //   {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'}
  // ]

  constructor(private _shared:SharedService, private router:Router,private dialogRef:MatDialogRef<SearchDialogComponent>, private _locationService:LocationService,
    private _snackBarService:CustomSnackBarService, public domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.loadDataForSearch();
    this.sanitizer=this.domSanitizer;
  }

  public selectItem(item:any){
    this.search.name = item.location;
    this.itemSelected = true;
  }

  public searchNameChange(filterString){
    this.filterData(filterString);
    this.itemSelected = false;
  }
  public filterData(filterString){
    let self=this;
    // let filteredData=_.filter(self.searchResult, (item)=>{
    //   let locationName:string=item.location;
    //   let cityName:string=item.city;
    //   if(cityName.includes(filterString) || locationName.includes(filterString)){
    //     return item;
    //   }
    // });
    let filteredData:any=[];
    for(let i=0; i<this.totalData.length; i++){
      let obj=this.totalData[i];
      if(obj.city.includes(filterString.toUpperCase()) || obj.location.includes(filterString.toUpperCase())){
        filteredData.push(obj);
      }
    }
    // _.result(_.find(this.searchResult, function(item) {
    //                   return item.city.includes(filterString) || item.location.includes(filterString);
    //               }), 'item');
    this.searchResult=filteredData;
  }
  public searchSubmit(){
    var self = this;
    self.dialogRef.close();
    if(self.search.name && self.search.stayType && self.search.gender && self.search.stayPlan){
      let filterData:any = {};
      filterData.location = self.search.name;
      filterData.stayType = self.search.stayType;
      filterData.gender = self.search.gender;
      filterData.nearby = self.search.nearby;
      filterData.stayPlan = self.search.stayPlan;
      self._shared.sharedData = filterData;
      self.router.navigate(["/stay-pg"]);
    }
  }
  loadDataForSearch(){
    let self = this;
    this._locationService.loadAllLocation().subscribe((response: any) => {
      if (response.error && response.error != '') {
        this._snackBarService.errorSnackBar('Something went wrong!');
        return;
      }
      else {
        let responseData: any = response.data[0];
        if (responseData.length > 0) {
          responseData.forEach(element => {
            let city = element.city;
            if (city && city.status == true) {
              let data: any = {};
              data.location = element.locationName;
              data.city = city.cityName;
              data.citypic=city.cityImage;
              self.searchResult.push(data);
              self.totalData.push(data);
            }
          });
          this._snackBarService.successSnackBar('Successfully Fetched!');
        }
        else {
          this._snackBarService.successSnackBar('No Record Found!');
        }
      }
    },
      (error: any) => {

      });
  }
}
