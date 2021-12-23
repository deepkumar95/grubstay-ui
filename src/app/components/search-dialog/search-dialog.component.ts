import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/helper/shared.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  itemSelected:boolean = false;
  stayTypes:any = ['Paying Guest','Flats','Rooms','Weekend Stay']

  search = {
    name : '',
    stayType:'',
    gender:'',
    nearby:'',
    stayPlan:''
  }
  searchResult = [
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'},
    {city:'Banglore', location:'HSR Layout', cityPic:'../../../assets/imgs/city/banglore.jpg'}
  ]

  constructor(private _shared:SharedService, private router:Router,private dialogRef:MatDialogRef<SearchDialogComponent>) { }

  ngOnInit(): void {
  }

  public selectItem(item:any){
    this.search.name = item.location;
    this.itemSelected = true;
  }

  public searchNameChange(){
    this.itemSelected = false;
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

}
