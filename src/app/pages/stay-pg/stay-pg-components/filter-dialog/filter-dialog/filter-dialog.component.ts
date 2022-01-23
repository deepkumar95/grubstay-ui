import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/helper/shared.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  constructor(private _sharedService: SharedService, private dialogRef: MatDialogRef<FilterDialogComponent>, private activatedRoute:ActivatedRoute) { }
  filteringData: any = {
    occupeny: '',
    min_price: '',
    max_price: '',
    gender: '',
    review: '',
    filter: false
  }

  occupencyArray: any = [
    { id: 'occ1', name: 'Single', checkedStatus: false },
    { id: 'occ2', name: 'Double', checkedStatus: false },
    { id: 'occ3', name: 'Triple', checkedStatus: false }
  ]

  budgetArray: any = [
    { id: 'bg1', name: 'Rs. 4500 to Rs. 6500', min_price: 4500, max_price: 6500, checkedStatus: false },
    { id: 'bg2', name: 'Rs. 6500 to Rs. 8500', min_price: 6500, max_price: 8500, checkedStatus: false },
    { id: 'bg3', name: 'Rs. 8500 to Rs. 10500', min_price: 8500, max_price: 10500, checkedStatus: false },
    { id: 'bg4', name: 'Rs. 10500 to Rs. 12500', min_price: 10500, max_price: 12500, checkedStatus: false },
    { id: 'bg5', name: 'Rs. 12500 to Rs. 14500', min_price: 12500, max_price: 14500, checkedStatus: false },
  ]

  genderArray: any = [
    { id: 'gd1', name: 'Male', value: 'male', checkedStatus: false },
    { id: 'gd2', name: 'Female', value: 'female', checkedStatus: false },
    { id: 'gd3', name: 'Both', value: 'both', checkedStatus: false }
  ]

  ratingArray: any = [
    { id: 'rt5', name: 'Five Star', checkedStatus: false, numberOfStar: 5 },
    { id: 'rt4', name: 'Four Star', checkedStatus: false, numberOfStar: 4 },
    { id: 'rt3', name: 'Triple Star', checkedStatus: false, numberOfStar: 3 },
    { id: 'rt2', name: 'Double Star', checkedStatus: false, numberOfStar: 2 },
    { id: 'rt1', name: 'Single Star', checkedStatus: false, numberOfStar: 1 },
  ]

  ngOnInit(): void {
  }
  setOccupancyfilter(id, name) {
    this.occupencyArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if (button.checked == true) {
          this.filteringData.occupeny = name;
          element.checkedStatus = true;
        }
        else {
          this.filteringData.occupeny = '';
          element.checkedStatus = false;
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }
  setBudgetfilter(id, name) {
    this.budgetArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if (button.checked == true) {
          this.filteringData.min_price = element.min_price;
          this.filteringData.max_price = element.max_price;
          element.checkedStatus = true;
        }
        else {
          this.filteringData.min_price = '';
          this.filteringData.max_price = '';
          element.checkedStatus = false;
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }
  setGenderFilter(id, name) {
    this.genderArray.forEach(element => {
      if (element.id == id && element.name == name) {
        let button: any = document.getElementById('' + id);
        if (button.checked == true) {
          this.filteringData.gender = element.value;
          element.checkedStatus = true;
        }
        else {
          this.filteringData.gender = '';
          element.checkedStatus = false;
        }
      } else {
        element.checkedStatus = false;
      }
    });
  }
  clearOccupancyFilter() {
    let self = this;
    self.occupencyArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.occupeny = '';
  }
  clearBudgetFilter() {
    let self = this;
    self.budgetArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.min_price = '';
    self.filteringData.max_price = '';
  }
  cleanGenderFilter() {
    let self = this;
    self.genderArray.forEach((item) => {
      item.checkedStatus = false;
    });
    self.filteringData.gender = '';
  }
  filterData() {
    this.filteringData.filter = true;
    this._sharedService.sharedData = this.filteringData;
    this.dialogRef.close();
    let currentRouter:any=this.activatedRoute.snapshot;
    this._sharedService.redirectTo(currentRouter._routerState.url);
  }
}
