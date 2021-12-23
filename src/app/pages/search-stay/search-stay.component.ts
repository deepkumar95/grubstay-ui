import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/helper/shared.service';

@Component({
  selector: 'app-search-stay',
  templateUrl: './search-stay.component.html',
  styleUrls: ['./search-stay.component.css']
})
export class SearchStayComponent implements OnInit {

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

  constructor(private _shared:SharedService, private router:Router) { }

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
